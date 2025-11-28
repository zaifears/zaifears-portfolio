'use client';

import { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import StudentsList from './components/StudentsList';
import CourseAnalysis from './components/CourseAnalysis';
import ExportData from './components/ExportData';
import StudentResultSummary from './components/StudentResultSummary';
import { ExcelData } from './types/types';
import { parseExcelFile } from './utils/excelParser';

type TabType = 'dashboard' | 'search' | 'analytics' | 'courses' | 'students' | 'export';

export default function ResultAnalyzerPage() {
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const data = await parseExcelFile(file);
      setExcelData(data);
      setActiveTab('dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
      setExcelData(null);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'search', label: 'Result Search' },
    { id: 'analytics', label: 'Batch Analytics' },
    { id: 'courses', label: 'Course Breakdown' },
    { id: 'students', label: 'All Students' },
    { id: 'export', label: 'Export Data' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Modern Header */}
      <div className="bg-blue-600 text-white sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">🎓 Result Analyzer</h1>
            <p className="text-blue-100 text-sm mt-1">Comprehensive student performance analysis</p>
          </div>
          {excelData && (
            <button 
              onClick={() => {
                setExcelData(null);
                setError(null);
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all backdrop-blur-sm"
            >
              Upload New File
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!excelData ? (
          // Upload Section
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Upload Result Sheet</h2>
              <p className="text-gray-500 mb-8 text-lg">
                Upload your Excel result file to generate comprehensive analytics, insights, and individual student reports.
              </p>
              <FileUpload onFileUpload={handleFileUpload} isLoading={loading} />
              {error && (
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 font-semibold">
                  ⚠️ {error}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-8">
                Supports Excel files (.xlsx) in standard university result format with course codes and grade points
              </p>
            </div>
          </div>
        ) : (
          // Main Content Section
          <>
            {/* Modern Tab Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content with Animation */}
            <div className="animate-fade-in">
              {activeTab === 'dashboard' && <Dashboard data={excelData} />}
              {activeTab === 'search' && <StudentResultSummary data={excelData} />}
              {activeTab === 'analytics' && <Charts data={excelData} />}
              {activeTab === 'courses' && <CourseAnalysis data={excelData} />}
              {activeTab === 'students' && <StudentsList data={excelData} />}
              {activeTab === 'export' && <ExportData data={excelData} />}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p className="font-semibold mb-1">🎓 University Result Analyzer</p>
          <p>All data is processed locally in your browser • No data is stored on servers</p>
        </div>
      </div>
    </div>
  );
}
