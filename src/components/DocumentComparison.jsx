import React, { useState } from 'react';

const DocumentComparison = ({ original, generated }) => {
  const [viewMode, setViewMode] = useState('split'); // 'split' or 'unified'
  const [showFormatting, setShowFormatting] = useState(false);

  // Helper to highlight the differences
  const highlightDifferences = (text, type) => {
    // In a real implementation, this would use a diff algorithm
    return (
      <div className={`font-mono text-sm ${type === 'added' ? 'bg-green-50' : 'bg-red-50'} p-1 rounded`}>
        {text}
      </div>
    );
  };

  const SplitView = () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Original Document */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Original</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <pre className="text-sm whitespace-pre-wrap font-mono">
            {original.content}
          </pre>
        </div>
      </div>

      {/* Generated Document */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Generated</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <pre className="text-sm whitespace-pre-wrap font-mono">
            {generated.content}
          </pre>
        </div>
      </div>
    </div>
  );

  const UnifiedView = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Unified View</h3>
      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
        {/* This would be replaced with actual diff results */}
        <div className="text-sm font-mono">
          {generated.content.split('\n').map((line, idx) => (
            <div key={idx} className={idx % 3 === 0 ? 'bg-green-50 p-1 rounded' : ''}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DiffSummary = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Changes Summary</h3>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="space-y-2">
          <h4 className="font-medium text-green-700">Added Content</h4>
          <ul className="space-y-1 text-green-600">
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v16m8-8H4" />
              </svg>
              Updated risk disclosures
            </li>
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v16m8-8H4" />
              </svg>
              New regulatory citations
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-red-700">Removed Content</h4>
          <ul className="space-y-1 text-red-600">
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12H4" />
              </svg>
              Outdated references
            </li>
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12H4" />
              </svg>
              Redundant clauses
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-blue-700">Modified Content</h4>
          <ul className="space-y-1 text-blue-600">
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Fee structure formatting
            </li>
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Service descriptions
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500 flex items-center gap-4">
          <span>Total changes: 6</span>
          <span>Words added: 127</span>
          <span>Words removed: 43</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded ${viewMode === 'split' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600'}`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`px-3 py-1 rounded ${viewMode === 'unified' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600'}`}
          >
            Unified View
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showFormatting}
            onChange={(e) => setShowFormatting(e.target.checked)}
            className="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
          />
          Show Formatting Marks
        </label>
      </div>

      {/* Diff Summary */}
      <DiffSummary />

      {/* Document View */}
      {viewMode === 'split' ? <SplitView /> : <UnifiedView />}
    </div>
  );
};

export default DocumentComparison;