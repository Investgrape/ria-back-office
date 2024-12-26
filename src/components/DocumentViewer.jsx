import React, { useState } from 'react';

const DocumentViewer = ({ document, onClose, onGenerateAI }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(document.content || '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium">{document.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Last updated: {document.lastUpdated}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onGenerateAI(document.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Generate with AI
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Document'}
            </button>
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

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-mono"
            />
          ) : (
            <div className="prose max-w-none">
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap font-mono">
                {content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;