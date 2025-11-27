'use client';

import { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import StudentsList from './components/StudentsList';
import CourseAnalysis from './components/CourseAnalysis';
import ExportData from './components/ExportData';
import { ExcelData } from './types/types';
import { parseExcelFile } from './utils/excelParser';

type TabType = 'dashboard' | 'analytics' | 'students' | 'courses' | 'export';

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

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'export', label: 'Export', icon: '💾' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            University Result Analyzer
          </h1>
          <p className="text-gray-600 mt-2">
            Upload Excel files to analyze student results with interactive charts and detailed reports
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!excelData ? (
          // Upload Section
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <FileUpload onFileUpload={handleFileUpload} isLoading={loading} />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}
          </div>
        ) : (
          // Tabs Section
          <>
            {/* Tab Navigation */}
            <div className="bg-white rounded-t-lg shadow-md border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-lg shadow-md p-6 md:p-8">
              {activeTab === 'dashboard' && <Dashboard data={excelData} />}
              {activeTab === 'analytics' && <Charts data={excelData} />}
              {activeTab === 'students' && <StudentsList data={excelData} />}
              {activeTab === 'courses' && <CourseAnalysis data={excelData} />}
              {activeTab === 'export' && <ExportData data={excelData} />}
            </div>

            {/* Upload New File Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setExcelData(null);
                  setActiveTab('dashboard');
                  setError(null);
                }}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Upload Another File
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>University Result Analyzer • All data is processed locally in your browser</p>
        </div>
      </div>
    </div>
  );
}
