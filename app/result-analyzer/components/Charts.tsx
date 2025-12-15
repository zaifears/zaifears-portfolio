'use client';

import { ExcelData } from '../types/types';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartsProps {
  data: ExcelData;
}

const GRADE_COLORS: Record<string, string> = {
  'A+': '#10b981',
  'A': '#3b82f6',
  'A-': '#06b6d4',
  'B+': '#f59e0b',
  'B': '#f97316',
  'B-': '#fb923c',
  'C+': '#ec4899',
  'C': '#8b5cf6',
  'D': '#6366f1',
  'F': '#ef4444',
};

export default function Charts({ data }: ChartsProps) {
  const { summary, courseStats, students } = data;

  // Grade distribution pie data
  const gradeData = Object.entries(summary.gradeDistribution)
    .filter(([_, count]) => count > 0)
    .map(([grade, count]) => ({
      name: grade,
      value: count,
    }));

  // Pass/Fail donut data
  const passFailData = [
    { name: 'Passed', value: summary.passedStudents },
    { name: 'Failed', value: summary.failedStudents },
  ];

  const passFailColors = ['#10b981', '#ef4444'];

  // Top performers - Students with most A+ grades
  const topPerformers = [...students]
    .map(s => ({
      name: s.name,
      aPlus: s.courses.filter(c => c.grade === 'A+').length,
      gpa: s.gpa,
    }))
    .filter(s => s.aPlus > 0)
    .sort((a, b) => b.aPlus - a.aPlus)
    .slice(0, 10);

  // Course average GPA data
  const courseGpaData = courseStats.map(course => ({
    code: course.code,
    avg: course.averageGP,
    name: course.name,
  }));

  // Course A+ count data
  const courseAPlusData = courseStats.map(course => ({
    code: course.code,
    aPlus: course.totalAPlus,
    name: course.name,
  }));
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Batch Analytics</h2>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Batch Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={GRADE_COLORS[entry.name] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pass/Fail Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Pass/Fail Ratio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={passFailData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
              >
                {passFailColors.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Average GPA by Course */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Average Grade Point by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseGpaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="code" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 4]} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload?.[0]) {
                    return (
                      <div className="bg-gray-900 text-white p-2 rounded text-xs">
                        <p className="font-bold">{payload[0].payload.name}</p>
                        <p>Avg GP: {payload[0].value?.toFixed(2)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="avg" fill="#3b82f6" name="Average GPA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* A+ Count by Course */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">A+ Grades by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseAPlusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="code" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload?.[0]) {
                    return (
                      <div className="bg-gray-900 text-white p-2 rounded text-xs">
                        <p className="font-bold">{payload[0].payload.name}</p>
                        <p>A+ Count: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="aPlus" fill="#10b981" name="A+ Count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        {topPerformers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🌟 Top 10 A+ Performers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Rank</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3 text-center">A+ Count</th>
                    <th className="p-3 text-center">GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topPerformers.map((student, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3 font-bold text-lg text-yellow-600">#{idx + 1}</td>
                      <td className="p-3 font-semibold text-gray-900">{student.name}</td>
                      <td className="p-3 text-center">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                          {student.aPlus}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono font-semibold">{student.gpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
