import React, { useState } from 'react';

const firmData = {
  name: 'Investment Advisers LLC',
  website: 'www.investmentadvisers.com',
  aum: '$500M',
  clientCount: 250,
  employeeCount: 15,
  locations: ['New York, NY', 'Boston, MA'],
  registrations: ['SEC', 'MA', 'NY', 'CT'],
  services: [
    'Portfolio Management',
    'Financial Planning',
    'Retirement Planning',
    'Tax Planning'
  ]
};

const AIGenerateModal = ({ document, onClose, onGenerate }) => {
  const [generating, setGenerating] = useState(false);
  const [customizations, setCustomizations] = useState({
    tone: 'professional',
    length: 'comprehensive',
    include_appendices: true,
    specific_regulations: true
  });

  const handleGenerate = async () => {
    setGenerating(true);
    // In a real implementation, this would make an API call to ChatGPT
    // with the document type, firm data, and customizations
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setGenerating(false);
    onGenerate({
      content: `Sample generated content for ${document.title}...`,
      metadata: {
        generated_at: new Date().toISOString(),
        model: 'gpt-4',
        customizations
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-medium">Generate {document.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                AI-assisted document generation using firm data
              </p>
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

        <div className="p-6 space-y-6">
          {/* Firm Data Preview */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Firm Data to Include</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {Object.entries(firmData).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Customization Options</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Tone</label>
                <select
                  value={customizations.tone}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, tone: e.target.value }))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md"
                >
                  <option value="professional">Professional</option>
                  <option value="formal">Formal</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700">Length</label>
                <select
                  value={customizations.length}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, length: e.target.value }))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md"
                >
                  <option value="comprehensive">Comprehensive</option>
                  <option value="concise">Concise</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={customizations.include_appendices}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, include_appendices: e.target.checked }))}
                    className="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">Include Appendices</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={customizations.specific_regulations}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, specific_regulations: e.target.checked }))}
                    className="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">Include State-Specific Regulations</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              'Generate Document'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIGenerateModal;