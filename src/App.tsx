import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm fixed w-full z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <span className="text-lg font-semibold">RIA Back Office</span>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <PlayCircle size={20} />
                Run Audit
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16 px-4">
          <Routes>
            <Route path="/" element={<div className="p-4">Welcome to RIA Back Office</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}