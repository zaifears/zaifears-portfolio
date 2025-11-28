'use client';

import { ExcelData, CourseStats } from '../types/types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, YAxis } from 'recharts';

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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Individual Course Analysis</h2>
        <p className="text-gray-500 text-sm mt-1">Total Courses: {data.totalCourses}</p>
      </div>

      {/* Course Summary Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-900 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Course Name</th>
              <th className="px-6 py-4 text-center">Total</th>
              <th className="px-6 py-4 text-center">Pass</th>
              <th className="px-6 py-4 text-center">Fail</th>
              <th className="px-6 py-4 text-center">Avg GP</th>
              <th className="px-6 py-4 text-center">A+ Count</th>
              <th className="px-6 py-4 text-center">Pass %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedCourses.map((course, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{course.code}</td>
                <td className="px-6 py-4 text-gray-700">{course.name}</td>
                <td className="px-6 py-4 text-center font-semibold">{course.totalStudents}</td>
                <td className="px-6 py-4 text-center font-semibold text-green-600">{course.passedStudents}</td>
                <td className="px-6 py-4 text-center font-semibold text-red-600">{course.failedStudents}</td>
                <td className="px-6 py-4 text-center font-mono font-bold">{course.averageGP.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs">
                    {course.totalAPlus}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCourseHealthColor(course.passPercentage)}`}>
                    {course.passPercentage.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Per-Course Detailed Charts */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 mt-8">Course Breakdown</h3>
        <div className="grid grid-cols-1 gap-8">
          {data.courseStats.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: CourseStats }) {
  const passFailData = [
    { name: 'Passed', value: course.passedStudents },
    { name: 'Failed', value: course.failedStudents }
  ];

  const gradeDistData = Object.entries(course.gradeDistribution)
    .filter(([_, val]) => val > 0)
    .map(([key, val]) => ({ name: key, value: val }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{course.code}</h3>
          <p className="text-gray-500 text-sm mt-1">{course.name}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
          course.passPercentage >= 80 
            ? 'bg-green-100 text-green-700' 
            : course.passPercentage >= 60 
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'
        }`}>
          Pass Rate: {course.passPercentage.toFixed(1)}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-xs font-bold text-gray-600 uppercase mb-1">Total Students</p>
          <p className="text-3xl font-black text-blue-600">{course.totalStudents}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-xs font-bold text-gray-600 uppercase mb-1">Avg Grade Point</p>
          <p className="text-3xl font-black text-green-600">{course.averageGP.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <p className="text-xs font-bold text-gray-600 uppercase mb-1">A+ Count</p>
          <p className="text-3xl font-black text-purple-600">{course.totalAPlus}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pass/Fail Donut */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase text-center mb-4">Pass vs Fail Ratio</h4>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={passFailData}
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            {course.passedStudents} Passed • {course.failedStudents} Failed
          </div>
        </div>

        {/* Grade Distribution Bar */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase text-center mb-4">Grade Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gradeDistData} layout="vertical" margin={{ left: 30, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={25} tick={{fontSize: 11, fontWeight: 600}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 font-semibold">Most Frequent Grade</p>
          <p className="text-xl font-bold text-gray-900">{course.mostFrequentGrade}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Failure Rate</p>
          <p className="text-xl font-bold text-red-600">{(100 - course.passPercentage).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
