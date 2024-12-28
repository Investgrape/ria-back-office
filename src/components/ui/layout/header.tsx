import React from 'react';
import { PlayCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <span className="ml-4 text-lg font-semibold">RIA Back Office</span>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
            <PlayCircle size={20} />
            Run Audit
          </button>
        </div>
      </div>
    </header>
  );
}