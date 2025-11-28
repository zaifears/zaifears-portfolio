/**
 * Get grade point value from letter grade
 * Based on standard 4.0 GPA scale
 */
export function getGradePoint(grade: string): number {
  const points: Record<string, number> = {
    'A+': 4.00,
    'A': 3.75,
    'A-': 3.50,
    'B+': 3.25,
    'B': 3.00,
    'B-': 2.75,
    'C+': 2.50,
    'C': 2.25,
    'D': 2.00,
    'F': 0.00,
    'AB': 0.00,  // Absent
    'I': 0.00,   // Incomplete
    'W': 0.00,   // Withdrawn
  };
  return points[grade.toUpperCase()] || 0.00;
}

/**
 * Check if a grade is passing grade
 */
export function isPassGrade(grade: string): boolean {
  const failGrades = ['F', 'AB', 'I', 'W'];
  return !failGrades.includes(grade.toUpperCase());
}

/**
 * Get grade description
 */
export function getGradeDescription(grade: string): string {
  const descriptions: Record<string, string> = {
    'A+': 'Outstanding',
    'A': 'Excellent',
    'A-': 'Very Good',
    'B+': 'Good',
    'B': 'Satisfactory',
    'B-': 'Above Average',
    'C+': 'Average',
    'C': 'Acceptable',
    'D': 'Poor',
    'F': 'Fail',
    'AB': 'Absent',
    'I': 'Incomplete',
    'W': 'Withdrawn',
  };
  return descriptions[grade.toUpperCase()] || 'Unknown';
}
