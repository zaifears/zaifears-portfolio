'use client';

import { useState } from 'react';
import { ExcelData, Student } from '../types/types';
import { FiSearch, FiAward, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export default function StudentResultSummary({ data }: { data: ExcelData }) {
  const [searchId, setSearchId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const found = data.students.find(s => s.registration.includes(searchId.trim()));
    if (found) {
      setStudent(found);
      setError('');
    } else {
      setStudent(null);
      setError('Student not found. Please check the ID.');
    }
  };

  const calculatePercentile = (rank: number, total: number) => {
    return Math.round(((total - rank) / total) * 100);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Individual Result</h2>
        <p className="text-gray-500 mb-6">Enter your student ID to view your performance and ranking</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Student ID (e.g. 2222151135)" 
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200 flex items-center gap-2"
          >
            <FiSearch /> Search
          </button>
        </div>
        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      </div>

      {student && (
        <div className="space-y-6 animate-fade-in">
          {/* Student Header Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{student.name}</h3>
                <p className="text-gray-500 text-lg">ID: {student.registration}</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">GPA</p>
                  <p className="text-4xl font-black text-blue-600 mt-1">{student.gpa.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Rank</p>
                  <p className="text-4xl font-black text-purple-600 mt-1">#{student.rank}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Percentile</p>
                  <p className="text-4xl font-black text-green-600 mt-1">Top {100 - calculatePercentile(student.rank || 0, data.summary.totalStudents)}%</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{student.courses.length}</p>
                </div>
                <div>
                  <p className="text-gray-500">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{student.courses.filter(c => c.status === 'Pass').length}</p>
                </div>
                <div>
                  <p className="text-gray-500">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{student.courses.filter(c => c.status === 'Fail').length}</p>
                </div>
                <div>
                  <p className="text-gray-500">Result</p>
                  <p className={`text-2xl font-bold ${student.result === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
                    {student.result}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-6">Subject Performance (Grade Points)</h4>
            <div className="h-80 w-full overflow-x-auto">
              <ResponsiveContainer width={Math.max(500, student.courses.length * 80)} height="100%">
                <BarChart data={student.courses} layout="vertical" margin={{ left: 100, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 4]} />
                  <YAxis type="category" dataKey="code" width={100} tick={{fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(59, 130, 246, 0.1)'}}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl text-xs">
                            <p className="font-bold text-sm mb-1">{data.name}</p>
                            <p>Grade: <span className="text-yellow-400 font-bold">{data.grade}</span></p>
                            <p>Point: {data.gradePoint.toFixed(2)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="gradePoint" barSize={20} radius={[0, 4, 4, 0]}>
                    {student.courses.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.gradePoint >= 3.5 ? '#10b981' : entry.gradePoint >= 3.0 ? '#3b82f6' : entry.gradePoint >= 2.0 ? '#f59e0b' : '#ef4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Details Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Course Code</th>
                  <th className="p-4">Course Name</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4 text-center">Point</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {student.courses.map((course, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-gray-900">{course.code}</td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{course.name}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs ${course.grade === 'F' || course.grade === 'AB' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono font-semibold text-lg">{course.gradePoint.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      {course.status === 'Pass' ? (
                        <span className="text-green-600 font-bold text-lg">✔</span>
                      ) : (
                        <span className="text-red-600 font-bold text-lg">✘</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance Summary */}
          {student.courses.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-6">Performance Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Best Subject */}
                {(() => {
                  const best = [...student.courses].sort((a, b) => b.gradePoint - a.gradePoint)[0];
                  return (
                    <div className="rounded-xl p-4 border border-green-200 bg-green-50">
                      <p className="text-sm text-gray-600 uppercase font-bold mb-2">Best Subject</p>
                      <p className="text-xl font-bold text-gray-900">{best.code}: {best.name}</p>
                      <p className="text-sm text-green-700 font-semibold mt-2">Grade: {best.grade} ({best.gradePoint.toFixed(2)})</p>
                    </div>
                  );
                })()}

                {/* Worst Subject */}
                {(() => {
                  const worst = [...student.courses].sort((a, b) => a.gradePoint - b.gradePoint)[0];
                  return (
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <p className="text-sm text-gray-600 uppercase font-bold mb-2">Weakest Subject</p>
                      <p className="text-xl font-bold text-gray-900">{worst.code}: {worst.name}</p>
                      <p className="text-sm text-red-700 font-semibold mt-2">Grade: {worst.grade} ({worst.gradePoint.toFixed(2)})</p>
                    </div>
                  );
                })()}

                {/* Class Comparison */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 uppercase font-bold mb-2">Class Position</p>
                  <p className="text-3xl font-black text-blue-600">#{student.rank}</p>
                  <p className="text-sm text-blue-700 font-semibold mt-2">out of {data.summary.totalStudents} students</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
