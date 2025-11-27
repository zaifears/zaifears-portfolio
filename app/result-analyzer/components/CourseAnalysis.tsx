'use client';

import { ExcelData } from '../types/types';

interface CourseAnalysisProps {
  data: ExcelData;
}

const getCourseHealthColor = (passPercentage: number) => {
  if (passPercentage >= 90) return 'bg-green-100 text-green-800';
  if (passPercentage >= 75) return 'bg-blue-100 text-blue-800';
  if (passPercentage >= 60) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

export default function CourseAnalysis({ data }: CourseAnalysisProps) {
  const sortedCourses = [...data.courseStats].sort((a, b) => b.passPercentage - a.passPercentage);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Course Analysis</h2>
        <p className="text-gray-600 mt-1">Total Courses: {data.totalCourses}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Code</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Students</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Passed</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Failed</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Average</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Pass %</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Range</th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map((course, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{course.code}</td>
                <td className="px-4 py-3 text-gray-900">{course.name}</td>
                <td className="px-4 py-3 text-gray-900">{course.totalStudents}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">{course.passedStudents}</td>
                <td className="px-4 py-3 text-red-600 font-semibold">{course.failedStudents}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{course.averageMarks.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCourseHealthColor(course.passPercentage)}`}>
                    {course.passPercentage.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  {course.lowestMarks} - {course.highestMarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Easiest Course */}
        {sortedCourses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Easiest Course</h3>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{sortedCourses[0].code}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Pass Rate: <span className="font-bold text-green-600">{sortedCourses[0].passPercentage.toFixed(1)}%</span>
            </p>
            <p className="text-sm text-gray-600">
              Average: <span className="font-bold">{sortedCourses[0].averageMarks.toFixed(2)}</span>
            </p>
          </div>
        )}

        {/* Hardest Course */}
        {sortedCourses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Most Difficult Course</h3>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{sortedCourses[sortedCourses.length - 1].code}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Pass Rate:{' '}
              <span className="font-bold text-red-600">
                {sortedCourses[sortedCourses.length - 1].passPercentage.toFixed(1)}%
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Average:{' '}
              <span className="font-bold">
                {sortedCourses[sortedCourses.length - 1].averageMarks.toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
