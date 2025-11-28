/**
 * Course interface - represents a single course with grade and GPA
 */
export interface Course {
  code: string;
  name: string;
  grade: string;  // Letter Grade (A+, A, B+, etc.)
  gradePoint: number; // GP (0.00 to 4.00)
  credits?: number;
  status: 'Pass' | 'Fail';
}

/**
 * Student interface - represents a single student with all their data
 */
export interface Student {
  registration: string;
  name: string;
  courses: Course[];
  gpa: number;  // Semester GPA
  cgpa?: number;  // Cumulative GPA if available
  result: 'Pass' | 'Fail';
  rank?: number;  // Class position (calculated)
}

/**
 * Grade distribution object
 */
export interface GradeDistribution {
  'A+': number;
  'A': number;
  'A-': number;
  'B+': number;
  'B': number;
  'B-': number;
  'C+': number;
  'C': number;
  'D': number;
  'F': number;
  [key: string]: number;
}

/**
 * Summary statistics for entire batch
 */
export interface SummaryStats {
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  averageCGPA: number;
  topCGPA: number;
  passPercentage: number;
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
  averageGP: number;  // Average Grade Point
  mostFrequentGrade: string;
  totalAPlus: number;  // Count of A+ grades
  passPercentage: number;
  gradeDistribution: GradeDistribution;
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
