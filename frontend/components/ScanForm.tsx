// components/ScanForm.tsx
'use client';

import { useState } from 'react';

type ScanMode = 'url' | 'zip';

export const ScanForm = () => {
  const [mode, setMode] = useState<ScanMode>('url');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'url') {
      console.log('Submitting URL:', url);
      // TODO: Send to backend API
    } else {
      console.log('Submitting File:', file?.name);
      // TODO: Upload file and send path to backend API
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-800">New Scan</h2>
      {/* Tab buttons */}
      <div className="my-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setMode('url')}
            className={`whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium ${
              mode === 'url'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Scan from Repository URL
          </button>
          <button
            onClick={() => setMode('zip')}
            className={`whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium ${
              mode === 'zip'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Upload a .zip file
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === 'url' ? (
          // URL Input
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Public Git Repository URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://github.com/user/repo.git"
            />
          </div>
        ) : (
          // ZIP File Input
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
            className={`mt-1 flex justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 ${
              isDragging ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none hover:text-blue-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".zip" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">ZIP up to 50MB</p>
              {file && <p className="pt-2 text-sm font-medium text-gray-800">{file.name}</p>}
            </div>
          </div>
        )}

        <div className="pt-5">
          <button
            type="submit"
            disabled={mode === 'url' ? !url : !file}
            className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Start Scan
          </button>
        </div>
      </form>
    </div>
  );
};