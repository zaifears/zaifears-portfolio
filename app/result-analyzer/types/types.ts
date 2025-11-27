/**
 * Course interface - represents a single course with marks and grade
 */
export interface Course {
  code: string;
  name: string;
  marks?: number;
  grade: string;
  credits?: number;
  gradePoint?: number;
  status: 'Pass' | 'Fail';
}

/**
 * Student interface - represents a single student with all their data
 */
export interface Student {
  registration: string;
  name: string;
  courses: Course[];
  totalMarks: number;
  totalGrade: string;
  averageMarks: number;
  result: 'Pass' | 'Fail';
  passedCourses: number;
  failedCourses: number;
}

/**
 * Grade distribution object
 */
export interface GradeDistribution {
  'A+': number;
  'A': number;
  'B+': number;
  'B': number;
  'C+': number;
  'C': number;
  'F': number;
}

/**
 * Summary statistics for entire batch
 */
export interface SummaryStats {
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  averageMarks: number;
  topMarks: number;
  lowestMarks: number;
  passPercentage: number;
  failPercentage: number;
  gradeDistribution: GradeDistribution;
}

/**
 * Course statistics interface
 */
export interface CourseStats {
  code: string;
  name: string;
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  averageMarks: number;
  highestMarks: number;
  lowestMarks: number;
  passPercentage: number;
}

/**
 * Main Excel data object after parsing
 */
export interface ExcelData {
  students: Student[];
  summary: SummaryStats;
  courseStats: CourseStats[];
  batchInfo: string;
  semesterInfo: string;
  totalCourses: number;
  parseDateTime: string;
}

/**
 * Parsed row from Excel sheet
 */
export interface RawExcelRow {
  [key: string]: string | number;
}
