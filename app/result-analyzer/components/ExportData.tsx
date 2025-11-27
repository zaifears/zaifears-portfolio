'use client';

import { ExcelData } from '../types/types';
import { FiDownload } from 'react-icons/fi';

interface ExportDataProps {
  data: ExcelData;
}

export default function ExportData({ data }: ExportDataProps) {
  const exportAsCSV = () => {
    let csv = 'Registration,Name,Total Marks,Average Marks,Grade,Result,Passed Courses,Failed Courses\n';

    data.students.forEach((student) => {
      csv += `"${student.registration}","${student.name}",${student.totalMarks},${student.averageMarks},${student.totalGrade},"${student.result}",${student.passedCourses},${student.failedCourses}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    downloadFile(blob, 'student-results.csv');
  };

  const exportAsJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    downloadFile(blob, 'student-results.json');
  };

  const exportAsSummaryCSV = () => {
    let csv = 'Course Code,Course Name,Total Students,Passed,Failed,Average Marks,Highest Marks,Lowest Marks,Pass Percentage\n';

    data.courseStats.forEach((course) => {
      csv += `"${course.code}","${course.name}",${course.totalStudents},${course.passedStudents},${course.failedStudents},${course.averageMarks},${course.highestMarks},${course.lowestMarks},${course.passPercentage}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    downloadFile(blob, 'course-analysis.csv');
  };

  const exportAsText = () => {
    let text = `BATCH RESULT ANALYSIS REPORT\n`;
    text += `${'='.repeat(50)}\n\n`;

    text += `Batch: ${data.batchInfo}\n`;
    text += `Semester: ${data.semesterInfo}\n`;
    text += `Analysis Date: ${data.parseDateTime}\n\n`;

    text += `SUMMARY STATISTICS\n`;
    text += `${'='.repeat(50)}\n`;
    text += `Total Students: ${data.summary.totalStudents}\n`;
    text += `Passed: ${data.summary.passedStudents} (${data.summary.passPercentage}%)\n`;
    text += `Failed: ${data.summary.failedStudents} (${data.summary.failPercentage}%)\n`;
    text += `Average Marks: ${data.summary.averageMarks}\n`;
    text += `Highest Marks: ${data.summary.topMarks}\n`;
    text += `Lowest Marks: ${data.summary.lowestMarks}\n`;
    text += `Total Courses: ${data.totalCourses}\n\n`;

    text += `GRADE DISTRIBUTION\n`;
    text += `${'='.repeat(50)}\n`;
    Object.entries(data.summary.gradeDistribution).forEach(([grade, count]) => {
      const percentage = ((count / data.summary.totalStudents) * 100).toFixed(1);
      text += `Grade ${grade}: ${count} students (${percentage}%)\n`;
    });
    text += '\n';

    text += `TOP 10 STUDENTS (BY AVERAGE MARKS)\n`;
    text += `${'='.repeat(50)}\n`;
    const topStudents = [...data.students].sort((a, b) => b.averageMarks - a.averageMarks).slice(0, 10);
    topStudents.forEach((student, idx) => {
      text += `${idx + 1}. ${student.name} (${student.registration}) - Avg: ${student.averageMarks}, Grade: ${student.totalGrade}\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    downloadFile(blob, 'student-results-report.txt');
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Export Data</h2>
        <p className="text-gray-600 mt-1">Download analysis results in different formats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Student Results CSV */}
        <button
          onClick={exportAsCSV}
          className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <FiDownload size={18} />
          <span>Student Results (CSV)</span>
        </button>

        {/* Course Analysis CSV */}
        <button
          onClick={exportAsSummaryCSV}
          className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <FiDownload size={18} />
          <span>Course Analysis (CSV)</span>
        </button>

        {/* JSON Export */}
        <button
          onClick={exportAsJSON}
          className="flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <FiDownload size={18} />
          <span>Full Report (JSON)</span>
        </button>

        {/* Text Report */}
        <button
          onClick={exportAsText}
          className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <FiDownload size={18} />
          <span>Summary Report (TXT)</span>
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Export Information</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Student Results CSV:</strong> Individual student marks and grades</li>
          <li>• <strong>Course Analysis CSV:</strong> Course-wise statistics and performance</li>
          <li>• <strong>Full Report JSON:</strong> Complete data with all calculations</li>
          <li>• <strong>Summary Report TXT:</strong> Human-readable batch analysis</li>
        </ul>
      </div>
    </div>
  );
}
