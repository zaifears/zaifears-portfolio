'use client';

import { ExcelData } from '../types/types';
import { FiUsers, FiTrendingUp, FiAward, FiBarChart2 } from 'react-icons/fi';

interface DashboardProps {
  data: ExcelData;
}

export default function Dashboard({ data }: DashboardProps) {
  const { summary } = data;

  const stats = [
    {
      label: 'Total Students',
      value: summary.totalStudents,
      icon: FiUsers,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Passed',
      value: summary.passedStudents,
      subtext: `${summary.passPercentage}%`,
      icon: FiTrendingUp,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Failed',
      value: summary.failedStudents,
      subtext: `${summary.failPercentage}%`,
      icon: FiAward,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    {
      label: 'Average Marks',
      value: summary.averageMarks,
      icon: FiBarChart2,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Batch: {data.batchInfo}</p>
        <p className="text-sm text-gray-500">Parsed: {data.parseDateTime}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  {stat.subtext && <p className="text-sm text-gray-500 mt-1">{stat.subtext}</p>}
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.textColor} text-xl`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Highest Marks</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{summary.topMarks}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Lowest Marks</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{summary.lowestMarks}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm font-medium">Total Courses</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{data.totalCourses}</p>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Grade Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.entries(summary.gradeDistribution).map(([grade, count]) => (
            <div key={grade} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-bold text-gray-900">{grade}</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{count}</p>
              <p className="text-xs text-gray-500 mt-1">
                {((count / summary.totalStudents) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
