import { read, utils } from 'xlsx';
import { Student, ExcelData, SummaryStats, CourseStats, GradeDistribution, RawExcelRow } from '../types/types';
import { calculateGrade, isPass } from './gradeCalculator';

export async function parseExcelFile(file: File): Promise<ExcelData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = read(arrayBuffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData: RawExcelRow[] = utils.sheet_to_json(worksheet, { defval: '' });
    
    if (rawData.length === 0) throw new Error('Excel file is empty');

    const students = parseStudentData(rawData);
    if (students.length === 0) {
      console.error('Raw data sample:', rawData.slice(0, 3));
      throw new Error('No valid student data found. Please ensure your Excel file has columns: Registration/ID, Name, Course Code, and Marks/Score');
    }

    const summary = calculateSummaryStats(students);
    const courseStats = calculateCourseStats(students);

    return {
      students,
      summary,
      courseStats,
      batchInfo: sheetName || 'Unknown Batch',
      semesterInfo: extractSemesterInfo(sheetName),
      totalCourses: courseStats.length,
      parseDateTime: new Date().toLocaleString(),
    };
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function extractSemesterInfo(sheetName: string): string {
  const match = sheetName.match(/\d+(?:st|nd|rd|th)?/i);
  return match ? `${match[0]} Semester` : 'Unknown Semester';
}

function parseStudentData(rawData: RawExcelRow[]): Student[] {
  if (rawData.length === 0) return [];
  
  const columnNames = Object.keys(rawData[0]);
  console.log('DEBUG: Available columns:', columnNames);
  
  const findColumn = (keywords: string[]): string | null => {
    // Try to find column by matching against any keyword
    for (const col of columnNames) {
      const colLower = col.toLowerCase().trim();
      
      // Exact match
      if (keywords.some(kw => colLower === kw.toLowerCase())) {
        return col;
      }
      
      // Partial match
      if (keywords.some(kw => {
        const kwLower = kw.toLowerCase();
        return colLower.includes(kwLower) || kwLower.includes(colLower);
      })) {
        return col;
      }
    }
    return null;
  };

  // Try to find columns with various keyword combinations
  const regCol = findColumn(['registration', 'reg', 'roll', 'student id', 'id', 'student_id', 'registration_number', 'reg no', 'register']);
  const nameCol = findColumn(['name', 'student name', 'full name', 'student_name', 'student']);
  const codeCol = findColumn(['code', 'course code', 'course_code', 'course', 'subject']);
  const marksCol = findColumn(['marks', 'score', 'marks obtained', 'total marks', 'obtained marks', 'marks_obtained', 'total_marks', 'total', 'marks out of']);

  console.log('DEBUG: Detected columns:', { regCol, nameCol, codeCol, marksCol });

  // If we can't find all required columns, try a fallback approach: assume column order
  if (!regCol || !nameCol || !codeCol || !marksCol) {
    console.warn('Could not find all required columns by keyword matching, trying column position fallback...');
    console.log('Column names available:', columnNames);
    
    // Fallback: use first 4 columns if they exist
    if (columnNames.length >= 4) {
      const fallbackRegCol = columnNames[0];
      const fallbackNameCol = columnNames[1];
      const fallbackCodeCol = columnNames[2];
      const fallbackMarksCol = columnNames[3];
      
      console.log('Using fallback columns:', { fallbackRegCol, fallbackNameCol, fallbackCodeCol, fallbackMarksCol });
      
      // Continue with fallback columns
      const students: Map<string, Student> = new Map();
      parseRows(rawData, students, fallbackRegCol, fallbackNameCol, fallbackCodeCol, fallbackMarksCol);
      return Array.from(students.values());
    }
    
    return [];
  }

  const students: Map<string, Student> = new Map();
  parseRows(rawData, students, regCol, nameCol, codeCol, marksCol);
  return Array.from(students.values());
}

function parseRows(
  rawData: RawExcelRow[],
  students: Map<string, Student>,
  regCol: string,
  nameCol: string,
  codeCol: string,
  marksCol: string
): void {
  for (const row of rawData) {
    const registration = String(row[regCol] || '').trim();
    const name = String(row[nameCol] || '').trim();
    const code = String(row[codeCol] || '').trim();
    const marks = Number(row[marksCol] || 0);

    if (!registration || !name || !code || isNaN(marks) || marks < 0) continue;

    if (!students.has(registration)) {
      students.set(registration, {
        registration,
        name,
        courses: [],
        totalMarks: 0,
        totalGrade: 'F',
        averageMarks: 0,
        result: 'Fail',
        passedCourses: 0,
        failedCourses: 0,
      });
    }

    const student = students.get(registration)!;
    const grade = calculateGrade(marks);
    const status = isPass(marks) ? 'Pass' : 'Fail';
    
    student.courses.push({
      code,
      name: code,
      marks,
      grade,
      status,
    });
  }

  students.forEach((student) => {
    if (student.courses.length === 0) {
      return;
    }

    const totalMarks = student.courses.reduce((sum, c) => sum + c.marks, 0);
    const averageMarks = totalMarks / student.courses.length;
    const passedCourses = student.courses.filter(c => c.status === 'Pass').length;
    const failedCourses = student.courses.filter(c => c.status === 'Fail').length;

    student.totalMarks = totalMarks;
    student.averageMarks = parseFloat(averageMarks.toFixed(2));
    student.totalGrade = calculateGrade(averageMarks);
    student.result = failedCourses === 0 ? 'Pass' : 'Fail';
    student.passedCourses = passedCourses;
    student.failedCourses = failedCourses;
  });
}

function calculateSummaryStats(students: Student[]): SummaryStats {
  if (students.length === 0) {
    return {
      totalStudents: 0,
      passedStudents: 0,
      failedStudents: 0,
      averageMarks: 0,
      topMarks: 0,
      lowestMarks: 0,
      passPercentage: 0,
      failPercentage: 0,
      gradeDistribution: { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'F': 0 },
    };
  }

  const passedStudents = students.filter(s => s.result === 'Pass').length;
  const failedStudents = students.length - passedStudents;
  const allMarks = students.flatMap(s => s.courses.map(c => c.marks));
  
  const averageMarks = allMarks.length > 0 ? parseFloat((allMarks.reduce((a, b) => a + b, 0) / allMarks.length).toFixed(2)) : 0;
  const topMarks = allMarks.length > 0 ? Math.max(...allMarks) : 0;
  const lowestMarks = allMarks.length > 0 ? Math.min(...allMarks) : 0;

  const gradeDistribution: GradeDistribution = {
    'A+': students.filter(s => s.totalGrade === 'A+').length,
    'A': students.filter(s => s.totalGrade === 'A').length,
    'B+': students.filter(s => s.totalGrade === 'B+').length,
    'B': students.filter(s => s.totalGrade === 'B').length,
    'C+': students.filter(s => s.totalGrade === 'C+').length,
    'C': students.filter(s => s.totalGrade === 'C').length,
    'F': students.filter(s => s.totalGrade === 'F').length,
  };

  return {
    totalStudents: students.length,
    passedStudents,
    failedStudents,
    averageMarks,
    topMarks,
    lowestMarks,
    passPercentage: parseFloat(((passedStudents / students.length) * 100).toFixed(2)),
    failPercentage: parseFloat(((failedStudents / students.length) * 100).toFixed(2)),
    gradeDistribution,
  };
}

function calculateCourseStats(students: Student[]): CourseStats[] {
  const courseData: Map<string, { marks: number[]; passes: number; fails: number }> = new Map();

  for (const student of students) {
    for (const course of student.courses) {
      if (!courseData.has(course.code)) {
        courseData.set(course.code, { marks: [], passes: 0, fails: 0 });
      }
      const data = courseData.get(course.code)!;
      data.marks.push(course.marks);
      if (course.status === 'Pass') data.passes++;
      else data.fails++;
    }
  }

  return Array.from(courseData.entries()).map(([code, data]) => {
    const total = data.marks.length;
    const avg = total > 0 ? parseFloat((data.marks.reduce((a, b) => a + b, 0) / total).toFixed(2)) : 0;
    
    return {
      code,
      name: code,
      totalStudents: total,
      passedStudents: data.passes,
      failedStudents: data.fails,
      averageMarks: avg,
      highestMarks: total > 0 ? Math.max(...data.marks) : 0,
      lowestMarks: total > 0 ? Math.min(...data.marks) : 0,
      passPercentage: total > 0 ? parseFloat(((data.passes / total) * 100).toFixed(2)) : 0,
    };
  });
}
