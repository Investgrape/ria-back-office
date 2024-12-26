import React, { useState } from 'react';

const mockAuditCategories = {
  books_and_records: {
    title: "Books and Records",
    items: [
      { id: "br1", title: "Client Agreements", required: true, status: "complete" },
      { id: "br2", title: "Account Statements", required: true, status: "pending" },
      { id: "br3", title: "Trade Records", required: true, status: "complete" },
      { id: "br4", title: "Fee Calculations", required: true, status: "incomplete" },
      { id: "br5", title: "Investment Policy Statements", required: false, status: "pending" }
    ]
  },
  cybersecurity: {
    title: "Cybersecurity",
    items: [
      { id: "cs1", title: "Incident Response Plan", required: true, status: "complete" },
      { id: "cs2", title: "Access Control Policy", required: true, status: "complete" },
      { id: "cs3", title: "Data Protection Policy", required: true, status: "pending" },
      { id: "cs4", title: "Vendor Due Diligence", required: true, status: "incomplete" }
    ]
  },
  fiduciary: {
    title: "Fiduciary Duty",
    items: [
      { id: "fd1", title: "Investment Management Agreement", required: true, status: "complete" },
      { id: "fd2", title: "Disclosure Documents", required: true, status: "complete" },
      { id: "fd3", title: "Best Interest Documentation", required: true, status: "pending" }
    ]
  }
};

const AuditCard = ({ category, data }) => {
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
      default:
        return 'bg-red-100 text-red-800';
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
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => toggleItem(item.id)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span className="text-sm">
                  {item.title}
                  {item.required && (
                    <span className="ml-2 text-xs text-red-600">*Required</span>
                  )}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RequiredDocuments = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">Documents Required for SEC/State Audit</h2>
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        The following documents should be readily available for regulatory examinations:
      </p>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Required Documentation</h3>
          <ul className="space-y-2">
            {[
              "Form ADV (Parts 1, 2A, 2B)",
              "Written Policies & Procedures",
              "Code of Ethics",
              "Business Continuity Plan"
            ].map((doc, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                </svg>
                {doc}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Additional Records</h3>
          <ul className="space-y-2">
            {[
              "Trading Records & Account Statements",
              "Marketing Materials",
              "Client Correspondence",
              "Performance Calculation Documentation"
            ].map((doc, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                </svg>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const AuditSection = () => {
  const [reportType, setReportType] = useState('firm');

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Audit Center</h1>
          <h2 className="text-2xl text-gray-500">Compliance Review & Reports</h2>
        </div>
        <div className="flex gap-4">
          <button 
            className={`px-4 py-2 rounded-lg ${
              reportType === 'firm' 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('firm')}
          >
            Firm-Wide
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${
              reportType === 'user' 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
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
          <AuditCard key={key} category={key} data={category} />
        ))}
      </div>

      <RequiredDocuments />
    </div>
  );
};

export default AuditSection;