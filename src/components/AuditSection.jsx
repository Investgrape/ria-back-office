import React, { useState } from 'react';
import DocumentViewer from './DocumentViewer';
import AIGenerateModal from './AIGenerateModal';

const mockAuditCategories = {
  books_and_records: {
    title: "Books and Records",
    items: [
      { 
        id: "br1", 
        title: "Client Agreements", 
        required: true, 
        status: "complete",
        lastUpdated: "2024-01-15",
        content: "Standard client agreement template..."
      },
      { 
        id: "br2", 
        title: "Account Statements", 
        required: true, 
        status: "pending",
        lastUpdated: "2024-01-10",
        content: "Monthly account statement format..."
      }
    ]
  },
  cybersecurity: {
    title: "Cybersecurity",
    items: [
      { 
        id: "cs1", 
        title: "Incident Response Plan", 
        required: true, 
        status: "complete",
        lastUpdated: "2024-01-20",
        content: "Cybersecurity incident response procedures..."
      },
      { 
        id: "cs2", 
        title: "Access Control Policy", 
        required: true, 
        status: "complete",
        lastUpdated: "2024-01-15",
        content: "Access control and authentication policies..."
      }
    ]
  },
  fiduciary: {
    title: "Fiduciary Duty",
    items: [
      { 
        id: "fd1", 
        title: "Investment Management Agreement", 
        required: true, 
        status: "complete",
        lastUpdated: "2024-01-15",
        content: "Investment management agreement template..."
      },
      { 
        id: "fd2", 
        title: "Form ADV Part 2A", 
        required: true, 
        status: "complete",
        lastUpdated: "2024-01-15",
        content: "Firm brochure detailing services, fees, and practices..."
      }
    ]
  },
  compliance: {
    title: "Compliance Program",
    items: [
      { 
        id: "cp1", 
        title: "Compliance Manual", 
        required: true, 
        status: "needs_update",
        lastUpdated: "2023-12-15",
        content: "Comprehensive compliance policies and procedures..."
      },
      { 
        id: "cp2", 
        title: "Code of Ethics", 
        required: true, 
        status: "complete",
        lastUpdated: "2024-01-10",
        content: "Code of ethics and personal trading policies..."
      }
    ]
  }
};

const AuditCard = ({ category, data, onViewDocument, onGenerateDocument }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const calculateProgress = () => {
    const completed = data.items.filter(item => item.status === 'complete').length;
    return Math.round((completed / data.items.length) * 100);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'complete':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs_update':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium">{data.title}</h3>
            <p className="text-sm text-gray-500">
              {data.items.length} compliance items
            </p>
          </div>
          <span className="text-2xl font-medium text-emerald-600">
            {calculateProgress()}%
          </span>
        </div>
        <div className="space-y-3">
          {data.items.map(item => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => toggleItem(item.id)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <span className="text-sm flex items-center gap-2">
                    {item.title}
                    {item.required && (
                      <span className="text-xs text-red-600">*Required</span>
                    )}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    Last updated: {item.lastUpdated}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                  {item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
                </span>
                <button
                  onClick={() => onViewDocument(item)}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => onGenerateDocument(item)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AuditSection = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [reportType, setReportType] = useState('firm');

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
  };

  const handleGenerateDocument = (document) => {
    setActiveDocument(document);
    setShowAIModal(true);
  };

  const handleGenerateComplete = (generatedContent) => {
    console.log('Generated content:', generatedContent);
    // In a real app, this would update the document with the generated content
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Audit Center</h1>
          <h2 className="text-2xl text-gray-500">Compliance Review & Reports</h2>
        </div>
        <div className="flex gap-4">
          <button 
            className={`px-4 py-2 rounded-lg ${reportType === 'firm' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setReportType('firm')}
          >
            Firm-Wide
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${reportType === 'user' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setReportType('user')}
          >
            User-Specific
          </button>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {Object.entries(mockAuditCategories).map(([key, category]) => (
          <AuditCard 
            key={key} 
            category={key} 
            data={category}
            onViewDocument={handleViewDocument}
            onGenerateDocument={handleGenerateDocument}
          />
        ))}
      </div>

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onGenerateAI={() => handleGenerateDocument(selectedDocument)}
        />
      )}

      {showAIModal && activeDocument && (
        <AIGenerateModal
          document={activeDocument}
          onClose={() => setShowAIModal(false)}
          onGenerate={handleGenerateComplete}
        />
      )}
    </div>
  );
};

export default AuditSection;