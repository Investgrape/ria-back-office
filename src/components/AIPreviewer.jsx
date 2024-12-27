import React, { useState } from 'react';

const AIPreviewer = ({ generatedContent, originalDocument, onApply, onEdit, onClose }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [showDiff, setShowDiff] = useState(false);

  const PreviewTabs = () => (
    <div className="flex border-b border-gray-200">
      {['preview', 'original', 'changes'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === tab
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  const PreviewSection = () => (
    <div className="p-6 bg-gray-50 rounded-lg font-mono text-sm whitespace-pre-wrap">
      {generatedContent.content}
      
      {/* Metadata Display */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Generation Details</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div>Model: {generatedContent.metadata.model}</div>
          <div>Generated: {new Date(generatedContent.metadata.generated_at).toLocaleString()}</div>
          <div>Customizations:</div>
          <ul className="ml-4">
            {Object.entries(generatedContent.metadata.customizations).map(([key, value]) => (
              <li key={key}>{key.replace('_', ' ')}: {value.toString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const OriginalSection = () => (
    <div className="p-6 bg-gray-50 rounded-lg font-mono text-sm whitespace-pre-wrap">
      {originalDocument.content}
    </div>
  );

  const ChangesSection = () => {
    const additions = [];
    const removals = [];
    // In a real implementation, this would use a diff algorithm
    // to show actual changes between the original and generated content

    return (
      <div className="space-y-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-2">Additions</h4>
          <ul className="space-y-2 text-sm text-green-700">
            <li>+ Additional regulatory references</li>
            <li>+ Updated compliance procedures</li>
            <li>+ Enhanced risk disclosures</li>
          </ul>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 mb-2">Removals</h4>
          <ul className="space-y-2 text-sm text-red-700">
            <li>- Outdated regulatory citations</li>
            <li>- Redundant clauses</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Modifications</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>~ Updated fee schedule format</li>
            <li>~ Revised service descriptions</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-medium">AI-Generated Document Preview</h2>
              <p className="text-sm text-gray-500 mt-1">{originalDocument.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <PreviewTabs />

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'preview' && <PreviewSection />}
          {activeTab === 'original' && <OriginalSection />}
          {activeTab === 'changes' && <ChangesSection />}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="keep-formatting"
              className="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
            />
            <label htmlFor="keep-formatting" className="text-sm text-gray-700">
              Preserve original formatting
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onEdit}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Edit Before Applying
            </button>
            <button
              onClick={onApply}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPreviewer;