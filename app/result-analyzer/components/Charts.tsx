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
  LineChart,
  Line,
} from 'recharts';

interface ChartsProps {
  data: ExcelData;
}

const GRADE_COLORS: Record<string, string> = {
  'A+': '#10b981',
  'A': '#3b82f6',
  'B+': '#f59e0b',
  'B': '#ef9d3d',
  'C+': '#f97316',
  'C': '#ec4899',
  'F': '#ef4444',
};

export default function Charts({ data }: ChartsProps) {
  const { summary, courseStats } = data;

  // Grade distribution pie data
  const gradeData = Object.entries(summary.gradeDistribution).map(([grade, count]) => ({
    name: grade,
    value: count,
  }));

  // Course performance bar data
  const courseData = courseStats.map((course) => ({
    name: course.code,
    avg: course.averageMarks,
    passed: course.passedStudents,
    failed: course.failedStudents,
  }));

  // Pass/Fail donut data
  const passFailData = [
    { name: 'Passed', value: summary.passedStudents },
    { name: 'Failed', value: summary.failedStudents },
  ];

  const passFailColors = ['#10b981', '#ef4444'];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics</h2>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Grade Distribution</h3>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pass/Fail Ratio</h3>
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

        {/* Course Average Marks */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Average Marks by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fill: '#4b5563' }} />
              <YAxis tick={{ fill: '#4b5563' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg" fill="#3b82f6" name="Average Marks" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pass Rate by Course */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pass Rate by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fill: '#4b5563' }} />
              <YAxis tick={{ fill: '#4b5563' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="passed" fill="#10b981" name="Passed" stackId="stack" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" stackId="stack" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
