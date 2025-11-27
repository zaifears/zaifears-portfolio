import { read, utils } from 'xlsx';
import { Student, ExcelData, SummaryStats, CourseStats, GradeDistribution, RawExcelRow } from '../types/types';
import { getGradePoint } from './gradeCalculator';

export async function parseExcelFile(file: File): Promise<ExcelData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = read(arrayBuffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // FIX 1: Read from the 2nd row (index 1) where real headers are
    const rawData: RawExcelRow[] = utils.sheet_to_json(worksheet, { range: 1, defval: '' });
    
    if (rawData.length === 0) throw new Error('Excel file is empty');

    const students = parseStudentData(rawData);
    
    if (students.length === 0) {
      console.error('Raw data sample:', rawData.slice(0, 3));
      throw new Error('No valid student data found. Ensure file has "Student ID" and "Course Code" columns.');
    }

    const summary = calculateSummaryStats(students);
    const courseStats = calculateCourseStats(students);

    return {
      students,
      summary,
      courseStats,
      batchInfo: sheetName || 'Unknown Batch',
      semesterInfo: 'Unknown Semester',
      totalCourses: courseStats.length,
      parseDateTime: new Date().toLocaleString(),
    };
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function parseStudentData(rawData: RawExcelRow[]): Student[] {
  const students: Student[] = [];

  for (const row of rawData) {
    // Identify Student ID and Name columns (flexible matching)
    const idKey = Object.keys(row).find(k => /Student ID|Registration|ID/i.test(k));
    const nameKey = Object.keys(row).find(k => /Student's Name|Name/i.test(k));

    if (!idKey || !nameKey) continue;

    const registration = String(row[idKey]).trim();
    const name = String(row[nameKey]).trim();

    if (!registration || !name) continue;

    const student: Student = {
      registration,
      name,
      courses: [],
      totalMarks: 0,
      totalGrade: '',
      averageMarks: 0,
      result: 'Pass',
      passedCourses: 0,
      failedCourses: 0,
    };

    // FIX 2: Iterate through all keys to find "Course Code" columns
    Object.keys(row).forEach(key => {
      if (key.startsWith("Course Code")) {
        const courseCode = String(row[key]).trim();
        if (!courseCode) return;

        // Find the suffix (e.g., "" for first or ".1", ".2", etc.)
        let suffix = key.replace("Course Code", "");
        
        // Attempt to find matching LG and GP keys
        const lgKey = Object.keys(row).find(k => 
          (k === `LG${suffix}` || k === `LG.${suffix.replace('_', '')}` || k === `LG${suffix.replace('.', '_')}`)
        ) || `LG${suffix}`;
        
        const gpKey = Object.keys(row).find(k => 
          (k === `GP${suffix}` || k === `GP.${suffix.replace('_', '')}` || k === `GP${suffix.replace('.', '_')}`)
        ) || `GP${suffix}`;

        const grade = String(row[lgKey] || '').trim();
        const gp = Number(row[gpKey] || 0);

        if (courseCode && grade) {
          const status = (grade === 'F' || grade === 'AB') ? 'Fail' : 'Pass';
          
          student.courses.push({
            code: courseCode,
            name: courseCode,
            grade: grade,
            gradePoint: gp,
            status: status,
            marks: 0
          });

          if (status === 'Pass') student.passedCourses++;
          else student.failedCourses++;
        }
      }
    });

    if (student.failedCourses > 0) student.result = 'Fail';
    
    // Calculate average GPA
    if (student.courses.length > 0) {
      const totalGP = student.courses.reduce((sum, c) => sum + (c.gradePoint || 0), 0);
      student.averageMarks = parseFloat((totalGP / student.courses.length).toFixed(2));
    }

    if (student.courses.length > 0) {
      students.push(student);
    }
  }

  return students;
}

function calculateSummaryStats(students: Student[]): SummaryStats {
  const totalStudents = students.length;
  const passedStudents = students.filter(s => s.result === 'Pass').length;
  const failedStudents = totalStudents - passedStudents;
  
  const gradeDistribution: GradeDistribution = { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'F': 0 };
  
  students.forEach(s => {
    if (s.result === 'Fail') {
      gradeDistribution['F']++;
    } else if (s.averageMarks >= 4.0) {
      gradeDistribution['A+']++;
    } else if (s.averageMarks >= 3.75) {
      gradeDistribution['A']++;
    } else if (s.averageMarks >= 3.25) {
      gradeDistribution['B+']++;
    } else if (s.averageMarks >= 3.00) {
      gradeDistribution['B']++;
    } else if (s.averageMarks >= 2.50) {
      gradeDistribution['C+']++;
    } else {
      gradeDistribution['C']++;
    }
  });

  return {
    totalStudents,
    passedStudents,
    failedStudents,
    averageMarks: totalStudents > 0 ? parseFloat((students.reduce((sum, s) => sum + s.averageMarks, 0) / totalStudents).toFixed(2)) : 0,
    topMarks: totalStudents > 0 ? Math.max(...students.map(s => s.averageMarks)) : 0,
    lowestMarks: totalStudents > 0 ? Math.min(...students.map(s => s.averageMarks)) : 0,
    passPercentage: totalStudents > 0 ? parseFloat(((passedStudents / totalStudents) * 100).toFixed(2)) : 0,
    failPercentage: totalStudents > 0 ? parseFloat(((failedStudents / totalStudents) * 100).toFixed(2)) : 0,
    gradeDistribution,
  };
}

function calculateCourseStats(students: Student[]): CourseStats[] {
  const courseMap = new Map<string, CourseStats>();

  students.forEach(student => {
    student.courses.forEach(course => {
      if (!courseMap.has(course.code)) {
        courseMap.set(course.code, {
          code: course.code,
          name: course.name,
          totalStudents: 0,
          passedStudents: 0,
          failedStudents: 0,
          averageMarks: 0,
          highestMarks: 0,
          lowestMarks: 4,
          passPercentage: 0
        });
      }

      const stats = courseMap.get(course.code)!;
      stats.totalStudents++;
      if (course.status === 'Pass') stats.passedStudents++;
      else stats.failedStudents++;
      
      stats.averageMarks += (course.gradePoint || 0);
      stats.highestMarks = Math.max(stats.highestMarks, course.gradePoint || 0);
      stats.lowestMarks = Math.min(stats.lowestMarks, course.gradePoint || 0);
    });
  });

  return Array.from(courseMap.values()).map(stats => ({
    ...stats,
    averageMarks: parseFloat((stats.averageMarks / stats.totalStudents).toFixed(2)),
    passPercentage: parseFloat(((stats.passedStudents / stats.totalStudents) * 100).toFixed(2))
  })).sort((a, b) => a.code.localeCompare(b.code));
}
