import { read, utils } from 'xlsx';
import { Student, ExcelData, SummaryStats, CourseStats, GradeDistribution, RawExcelRow } from '../types/types';
import { getGradePoint, isPassGrade } from './gradeCalculator';

export async function parseExcelFile(file: File): Promise<ExcelData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = read(arrayBuffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Read raw data including footer for course names
    const fullSheetData = utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    const rawData: RawExcelRow[] = utils.sheet_to_json(worksheet, { range: 1, defval: '' });
    
    // Extract course names from footer
    const courseMap = extractCourseNames(fullSheetData);

    const students = parseStudentData(rawData, courseMap);
    
    if (students.length === 0) {
      throw new Error('No valid student data found. Please check the Excel format matches the standard result sheet.');
    }

    const summary = calculateSummaryStats(students);
    const courseStats = calculateCourseStats(students);

    return {
      students,
      summary,
      courseStats,
      batchInfo: sheetName || 'Unknown Batch',
      semesterInfo: 'Semester Result',
      totalCourses: courseStats.length,
      parseDateTime: new Date().toLocaleString(),
    };
  } catch (error) {
    console.error('Parse error:', error);
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Extract course code to name mapping from the footer of the Excel sheet
 * Looks for pattern: "Course Code & Title: 1. CODE : Name 2. CODE : Name ..."
 */
function extractCourseNames(data: any[][]): Map<string, string> {
  const map = new Map<string, string>();
  
  // Search from the end of the data backwards
  for (let i = data.length - 1; i >= Math.max(0, data.length - 10); i--) {
    for (const cell of data[i]) {
      if (typeof cell === 'string' && cell.includes('Course Code & Title')) {
        // Extract the part after "Course Code & Title:"
        const contentMatch = cell.match(/Course Code & Title\s*:?\s*(.+)/i);
        if (!contentMatch) continue;
        
        const content = contentMatch[1];
        
        // Split by numbered entries like "1.", "2.", etc.
        // Example: "1. ALD1204 : Microeconomics 2. ALD2201 : ..."
        const entries = content.split(/\d+\.\s+/).filter(Boolean);
        
        entries.forEach(entry => {
          // Each entry is "CODE : Name"
          const parts = entry.split(':');
          if (parts.length >= 2) {
            const code = parts[0].trim();
            const name = parts.slice(1).join(':').trim();
            if (code && name && code.match(/^[A-Z]+\d{4}$/)) {
              map.set(code, name);
            }
          }
        });
      }
    }
  }
  
  return map;
}

function parseStudentData(rawData: RawExcelRow[], courseMap: Map<string, string>): Student[] {
  const students: Student[] = [];
  
  // First pass: collect all courses to identify the semester with most enrollments
  const semesterCourses = new Map<string, number>(); // semester -> count
  const courseToSemester = new Map<string, string>(); // course code -> semester pattern

  for (const row of rawData) {
    Object.keys(row).forEach(key => {
      if (key.startsWith("Course Code")) {
        const courseCode = String(row[key]).trim();
        if (!courseCode) return;
        
        // Extract semester pattern from course code (e.g., "XXX320X" -> "320")
        const semesterMatch = courseCode.match(/(\d{3})/);
        if (semesterMatch) {
          const semester = semesterMatch[1];
          courseToSemester.set(courseCode, semester);
          semesterCourses.set(semester, (semesterCourses.get(semester) || 0) + 1);
        }
      }
    });
  }

  // Find the semester with the most courses
  let targetSemester = '';
  let maxCourses = 0;
  for (const [semester, count] of semesterCourses) {
    if (count > maxCourses) {
      maxCourses = count;
      targetSemester = semester;
    }
  }

  console.log('Target semester pattern:', targetSemester, 'with', maxCourses, 'courses');

  for (const row of rawData) {
    // Flexible key matching for student ID and name
    const idKey = Object.keys(row).find(k => /Student ID|Registration|ID|enrollment/i.test(k));
    const nameKey = Object.keys(row).find(k => /Student's Name|Name|student name/i.test(k));
    
    if (!idKey || !nameKey) continue;

    const registration = String(row[idKey]).trim();
    const name = String(row[nameKey]).trim();

    // Skip header rows and invalid entries
    if (!registration || !name || /registration|student id|ID/i.test(registration)) continue;

    // Check for explicit Status/Result column in the Excel file
    const statusKey = Object.keys(row).find(k => /Status|Result|Remarks/i.test(k) && !k.includes('Course'));
    const statusValue = statusKey ? String(row[statusKey]).trim().toLowerCase() : '';

    const student: Student = {
      registration,
      name,
      courses: [],
      gpa: 0,
      result: 'Pass',
    };

    // Parse courses (horizontal scanning for multiple Course Code columns)
    const keys = Object.keys(row);
    
    keys.forEach(key => {
      if (key.startsWith('Course Code')) {
        const courseCode = String(row[key]).trim();
        if (!courseCode) return;

        // Get the suffix to match LG and GP columns
        const suffix = key.replace('Course Code', '');
        
        // Find corresponding LG (Letter Grade) and GP (Grade Point) columns
        const lgKey = `LG${suffix}`;
        const gpKey = `GP${suffix}`;

        const grade = String(row[lgKey] || '').trim().toUpperCase();
        const gp = Number(row[gpKey] || 0);

        if (grade && gp >= 0) {
          student.courses.push({
            code: courseCode,
            name: courseMap.get(courseCode) || courseCode,
            grade: grade,
            gradePoint: gp,
            status: isPassGrade(grade) ? 'Pass' : 'Fail',
          });
        }
      }
    });

    // Calculate overall result based on failed courses
    const hasFail = student.courses.some(c => c.status === 'Fail');
    student.result = hasFail ? 'Fail' : 'Pass';

    // Find and parse GPA if available
    const gpaKey = keys.find(k => k === 'GPA' || k === 'SGPA');
    if (gpaKey) {
      student.gpa = Number(row[gpaKey] || 0);
    }

    // Find and parse CGPA if available
    const cgpaKey = keys.find(k => k === 'CGPA');
    if (cgpaKey) {
      student.cgpa = Number(row[cgpaKey] || 0);
    }

    // Only add students with courses
    if (student.courses.length > 0) {
      students.push(student);
    }
  }

  // Sort students by GPA (descending) and assign ranks
  students.sort((a, b) => (b.gpa || 0) - (a.gpa || 0));
  students.forEach((s, index) => {
    s.rank = index + 1;
  });

  return students;
}

function calculateSummaryStats(students: Student[]): SummaryStats {
  const totalStudents = students.length;
  const passedStudents = students.filter(s => s.result === 'Pass').length;
  const failedStudents = totalStudents - passedStudents;
  
  // Initialize grade distribution
  const gradeDistribution: GradeDistribution = {
    'A+': 0, 'A': 0, 'A-': 0,
    'B+': 0, 'B': 0, 'B-': 0,
    'C+': 0, 'C': 0, 'D': 0, 'F': 0
  };

  let totalGPA = 0;
  
  students.forEach(s => {
    totalGPA += s.gpa || 0;
    
    // Map GPA to grade for summary distribution
    const gpa = s.gpa || 0;
    if (gpa >= 4.0) gradeDistribution['A+']++;
    else if (gpa >= 3.75) gradeDistribution['A']++;
    else if (gpa >= 3.50) gradeDistribution['A-']++;
    else if (gpa >= 3.25) gradeDistribution['B+']++;
    else if (gpa >= 3.00) gradeDistribution['B']++;
    else if (gpa >= 2.75) gradeDistribution['B-']++;
    else if (gpa >= 2.50) gradeDistribution['C+']++;
    else if (gpa >= 2.25) gradeDistribution['C']++;
    else if (gpa >= 2.00) gradeDistribution['D']++;
    else gradeDistribution['F']++;
  });

  const averageCGPA = totalStudents > 0 ? parseFloat((totalGPA / totalStudents).toFixed(2)) : 0;
  const topCGPA = students.length > 0 ? students[0].gpa || 0 : 0;

  return {
    totalStudents,
    passedStudents,
    failedStudents,
    averageCGPA,
    topCGPA,
    passPercentage: totalStudents > 0 ? parseFloat(((passedStudents / totalStudents) * 100).toFixed(2)) : 0,
    gradeDistribution,
  };
}

function calculateCourseStats(students: Student[]): CourseStats[] {
  const courseMap = new Map<string, CourseStats>();

  // Initialize course stats for all courses
  students.forEach(student => {
    student.courses.forEach(c => {
      if (!courseMap.has(c.code)) {
        courseMap.set(c.code, {
          code: c.code,
          name: c.name,
          totalStudents: 0,
          passedStudents: 0,
          failedStudents: 0,
          averageGP: 0,
          mostFrequentGrade: '',
          totalAPlus: 0,
          passPercentage: 0,
          gradeDistribution: {
            'A+': 0, 'A': 0, 'A-': 0,
            'B+': 0, 'B': 0, 'B-': 0,
            'C+': 0, 'C': 0, 'D': 0, 'F': 0
          }
        });
      }

      const stats = courseMap.get(c.code)!;
      stats.totalStudents++;
      stats.averageGP += c.gradePoint;
      
      // Count grades for distribution
      const gradeKey = c.grade.toUpperCase() as keyof GradeDistribution;
      if (gradeKey in stats.gradeDistribution) {
        stats.gradeDistribution[gradeKey]++;
      } else {
        // Handle AB, I, W as F for visualization
        stats.gradeDistribution['F']++;
      }

      // Count A+ grades
      if (c.grade === 'A+') {
        stats.totalAPlus++;
      }
      
      // Count pass/fail
      if (c.status === 'Pass') {
        stats.passedStudents++;
      } else {
        stats.failedStudents++;
      }
    });
  });

  // Calculate aggregated stats
  return Array.from(courseMap.values()).map(stats => {
    // Find most frequent grade
    let maxFreq = 0;
    let freqGrade = '';
    Object.entries(stats.gradeDistribution).forEach(([grade, count]) => {
      if (count > maxFreq) {
        maxFreq = count;
        freqGrade = grade;
      }
    });

    return {
      ...stats,
      averageGP: parseFloat((stats.averageGP / stats.totalStudents).toFixed(2)),
      passPercentage: parseFloat(((stats.passedStudents / stats.totalStudents) * 100).toFixed(2)),
      mostFrequentGrade: freqGrade,
    };
  });
}
