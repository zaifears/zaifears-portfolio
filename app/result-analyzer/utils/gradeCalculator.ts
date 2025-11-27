/**
 * Convert marks (0-100) to letter grade (A+ to F)
 */
export function calculateGrade(marks: number): string {
  const numMarks = Number(marks);
  if (isNaN(numMarks)) return 'F';
  if (numMarks >= 90) return 'A+';
  if (numMarks >= 80) return 'A';
  if (numMarks >= 70) return 'B+';
  if (numMarks >= 60) return 'B';
  if (numMarks >= 50) return 'C+';
  if (numMarks >= 40) return 'C';
  return 'F';
}

/**
 * Check if marks is passing (>= 40)
 */
export function isPass(marks: number): boolean {
  const numMarks = Number(marks);
  return !isNaN(numMarks) && numMarks >= 40;
}

/**
 * Get grade point (for GPA calculation)
 */
export function getGradePoint(grade: string): number {
  const points: Record<string, number> = {
    'A+': 4.0,
    'A': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'C+': 2.7,
    'C': 2.0,
    'F': 0.0,
  };
  return points[grade] || 0;
}

/**
 * Get grade description
 */
export function getGradeDescription(grade: string): string {
  const descriptions: Record<string, string> = {
    'A+': 'Outstanding',
    'A': 'Excellent',
    'B+': 'Very Good',
    'B': 'Good',
    'C+': 'Satisfactory',
    'C': 'Pass',
    'F': 'Fail',
  };
  return descriptions[grade] || 'Unknown';
}
