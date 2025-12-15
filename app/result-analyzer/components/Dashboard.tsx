'use client';

import { ExcelData } from '../types/types';
import { FiUsers, FiTrendingUp, FiAward, FiBook } from 'react-icons/fi';

interface DashboardProps {
  data: ExcelData;
}

export default function Dashboard({ data }: DashboardProps) {
  const { summary, courseStats } = data;

  // Find insights
  const hardestCourse = [...courseStats].sort((a, b) => a.averageGP - b.averageGP)[0];
  const mostAPlusCourse = [...courseStats].sort((a, b) => b.totalAPlus - a.totalAPlus)[0];

  const stats = [
    {
      label: 'Total Students',
      value: summary.totalStudents,
      icon: FiUsers,
      color: 'blue',
    },
    {
      label: 'Overall Pass Rate',
      value: `${summary.passPercentage}%`,
      subtext: `${summary.passedStudents} Passed / ${summary.failedStudents} Failed`,
      icon: FiTrendingUp,
      color: 'green',
    },
    {
      label: 'Batch Average GPA',
      value: summary.averageCGPA.toFixed(2),
      icon: FiAward,
      color: 'purple',
    },
    {
      label: 'Highest GPA',
      value: summary.topCGPA.toFixed(2),
      icon: FiAward,
      color: 'yellow',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Batch Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Batch: {data.batchInfo}</p>
        <p className="text-xs text-gray-400">Parsed: {data.parseDateTime}</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'text-blue-600 bg-blue-50',
            green: 'text-green-600 bg-green-50',
            purple: 'text-purple-600 bg-purple-50',
            yellow: 'text-yellow-600 bg-yellow-50',
          };
          const color = colorClasses[stat.color as keyof typeof colorClasses];

          return (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                <div className={`p-2 rounded-lg ${color}`}>
                  <Icon className="text-xl" />
                </div>
              </div>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              {stat.subtext && <p className="text-xs text-gray-500 mt-2">{stat.subtext}</p>}
            </div>
          );
        })}
      </div>

<<<<<<< HEAD
      {/* Course Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hardestCourse && (
          <div className="rounded-2xl border border-red-200 p-6 shadow-sm bg-red-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FiBook className="text-red-600 text-xl" />
              </div>
              <h3 className="font-bold text-red-900 text-lg">Toughest Course</h3>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">{hardestCourse.code}: {hardestCourse.name}</p>
            <div className="space-y-1 text-sm text-red-900">
              <p>Lowest Avg GPA: <span className="font-bold text-red-700">{hardestCourse.averageGP.toFixed(2)}</span></p>
              <p>Failed Students: <span className="font-bold">{hardestCourse.failedStudents} ({hardestCourse.passPercentage < 50 ? '⚠️ Critical' : 'Moderate'})</span></p>
            </div>
          </div>
        )}

        {mostAPlusCourse && (
          <div className="rounded-2xl border border-green-200 p-6 shadow-sm bg-green-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FiAward className="text-green-600 text-xl" />
              </div>
              <h3 className="font-bold text-green-900 text-lg">High Performers</h3>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">{mostAPlusCourse.code}: {mostAPlusCourse.name}</p>
            <div className="space-y-1 text-sm text-green-900">
              <p>Most A+ Count: <span className="font-bold text-green-700">{mostAPlusCourse.totalAPlus} students</span></p>
              <p>Pass Rate: <span className="font-bold">{mostAPlusCourse.passPercentage.toFixed(1)}% 🎉</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Grade Distribution Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Grade Distribution Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {Object.entries(summary.gradeDistribution)
            .filter(([_, count]) => count > 0)
            .map(([grade, count]) => (
              <div
                key={grade}
                className={`text-center p-3 rounded-xl border-2 transition-all ${
                  count > 0
                    ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <p className="font-bold text-gray-900 text-lg">{grade}</p>
                <p className="text-xl font-black text-blue-600 mt-1">{count}</p>
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
