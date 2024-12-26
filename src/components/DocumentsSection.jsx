import React, { useState } from 'react';

const mockDocuments = {
  regulatory: {
    title: "Regulatory Documents",
    items: [
      {
        id: "adv1",
        title: "Form ADV Part 1",
        lastUpdated: "2024-01-15",
        status: "current",
        finraLinked: true,
        sections: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]
      },
      {
        id: "adv2a",
        title: "Form ADV Part 2A",
        lastUpdated: "2024-01-15",
        status: "needs_review",
        finraLinked: true,
        sections: ["Firm Overview", "Services", "Fees", "Methods of Analysis"]
      },
      {
        id: "adv2b",
        title: "Form ADV Part 2B",
        lastUpdated: "2024-01-10",
        status: "current",
        finraLinked: true,
        sections: ["Educational Background", "Disciplinary Information"]
      }
    ]
  },
  policies: {
    title: "Policies & Procedures",
    items: [
      {
        id: "pol1",
        title: "Written Policies & Procedures Manual",
        lastUpdated: "2024-01-20",
        status: "current",
        sections: ["Trading", "Privacy", "Anti-Money Laundering", "Best Execution"]
      },
      {
        id: "pol2",
        title: "Code of Ethics",
        lastUpdated: "2024-01-05",
        status: "needs_review",
        sections: ["Personal Trading", "Gifts & Entertainment", "Confidentiality"]
      },
      {
        id: "pol3",
        title: "Business Continuity Plan",
        lastUpdated: "2023-12-15",
        status: "needs_update",
        sections: ["Emergency Contacts", "Data Backup", "Alternative Locations"]
      }
    ]
  }
};

const DocumentCard = ({ document }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'current':
        return 'bg-emerald-100 text-emerald-800';
      case 'needs_review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
                <path d="M10 9H8"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{document.title}</h3>
              <p className="text-sm text-gray-500">Last updated: {document.lastUpdated}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {document.finraLinked && (
              <svg className="w-5 h-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            )}
            <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(document.status)}`}>
              {document.status === 'current' ? 'Current' : 
               document.status === 'needs_review' ? 'Needs Review' : 
               'Update Required'}
            </span>
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentsSection = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Documents</h1>
          <h2 className="text-2xl text-gray-500">Regulatory & Compliance</h2>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Upload Document
          </button>
        </div>
      </div>

      {Object.entries(mockDocuments).map(([key, category]) => (
        <div key={key} className="space-y-4">
          <h2 className="text-lg font-medium">{category.title}</h2>
          <div className="grid gap-4">
            {category.items.map(document => (
              <DocumentCard 
                key={document.id} 
                document={document}
                onClick={() => setSelectedDocument(document)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsSection;