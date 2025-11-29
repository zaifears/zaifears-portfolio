'use client';

import { useMemo, useState } from 'react';
import { ExcelData } from '../types/types';
import { FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface StudentListProps {
  data: ExcelData;
}

type SortKey = 'registration' | 'name' | 'averageMarks' | 'totalGrade';
type SortOrder = 'asc' | 'desc';

export default function StudentsList({ data }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('registration');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = useMemo(() => {
    return data.students.filter((student) => {
      const search = searchTerm.toLowerCase();
      return (
        student.registration.toLowerCase().includes(search) ||
        student.name.toLowerCase().includes(search)
      );
    });
  }, [data.students, searchTerm]);

  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents];
    sorted.sort((a, b) => {
      let aVal: any = a[sortKey as keyof typeof a];
      let bVal: any = b[sortKey as keyof typeof b];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredStudents, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C+':
        return 'bg-yellow-100 text-yellow-800';
      case 'C':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Student Results</h2>
        <p className="text-gray-600 mt-1">Total Students: {data.summary.totalStudents}</p>
      </div>

      {/* Top Performers (Nerds) Section */}
      {(() => {
        const topPerformers = [...data.students]
          .sort((a, b) => b.averageMarks - a.averageMarks)
          .slice(0, 10);

        return (
          <div className="bg-linear-to-r from-amber-50 to-yellow-50 rounded-lg shadow-md p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🧠 Top Performers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topPerformers.map((student, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-yellow-100">
                  <div className="mb-2">
                    <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.registration}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-yellow-100">
                    <p className="text-sm text-gray-600">GPA: <span className="font-bold text-yellow-600">{student.averageMarks.toFixed(2)}</span></p>
                    <p className="text-xs text-green-600 mt-1">✓ {student.passedCourses} Passed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Search Box */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by registration or name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
      </p>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('registration')}
              >
                <div className="flex items-center space-x-1">
                  <span>Registration</span>
                  {sortKey === 'registration' &&
                    (sortOrder === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />)}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  {sortKey === 'name' &&
                    (sortOrder === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />)}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('averageMarks')}
              >
                <div className="flex items-center space-x-1">
                  <span>Average</span>
                  {sortKey === 'averageMarks' &&
                    (sortOrder === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />)}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('totalGrade')}
              >
                <div className="flex items-center space-x-1">
                  <span>Grade</span>
                  {sortKey === 'totalGrade' &&
                    (sortOrder === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />)}
                </div>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Result</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Courses</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900 font-medium">{student.registration}</td>
                <td className="px-4 py-3 text-gray-900">{student.name}</td>
                <td className="px-4 py-3 text-gray-900">{student.averageMarks.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(student.totalGrade)}`}>
                    Grade: {student.totalGrade}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {student.result === 'Pass' ? (
                    <span className="text-green-600 font-semibold">✓ Pass</span>
                  ) : (
                    <span className="text-red-600 font-semibold">✗ Fail</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  P: {student.passedCourses} / F: {student.failedCourses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedStudents.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-gray-500">No students found matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
