'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  isLoading?: boolean;
}

export default function FileUpload({ onFileUpload, isLoading = false }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length === 0) {
        setError('Please upload a valid Excel file (.xlsx)');
        return;
      }

      const file = acceptedFiles[0];

      // Validate file type
      if (!file.name.endsWith('.xlsx')) {
        setError('Please upload an Excel file (.xlsx format)');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit');
        return;
      }

      setFileName(file.name);

      try {
        await onFileUpload(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process file');
        setFileName(null);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 md:p-12 transition-all cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isLoading} />

        <div className="flex flex-col items-center justify-center space-y-3">
          <AiOutlineCloudUpload className="text-4xl text-gray-400" />
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              {isDragActive ? 'Drop your Excel file here' : 'Drag Excel file here or click to browse'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported format: .xlsx (Max 10MB)
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-sm font-medium text-gray-700">Processing file...</p>
            </div>
          </div>
        )}
      </div>

      {fileName && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm text-green-800">File loaded: {fileName}</span>
        </div>
      )}

      {error && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm text-red-800">{error}</span>
        </div>
      )}
    </div>
  );
}
