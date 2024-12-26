import React, { useState } from 'react';

const mockEmailData = {
  flaggedEmails: [
    {
      id: 1,
      sender: "Sarah Johnson",
      senderId: "sarah.j",
      manager: "Michael Chen",
      subject: "Investment Performance Update Q4",
      snippet: "Our strategy has consistently outperformed the market by leveraging proprietary analysis...",
      date: "2024-01-24 14:30",
      recipients: ["client.group@example.com"],
      issues: [
        {
          type: "performance_claims",
          description: "Unsubstantiated performance claims without proper disclaimers",
          solution: "Add required performance disclaimers and historical context"
        }
      ],
      status: "pending_review"
    },
    {
      id: 2,
      sender: "James Wilson",
      senderId: "james.w",
      manager: "Michael Chen",
      subject: "Exclusive Investment Opportunity",
      snippet: "Don't miss out on this guaranteed return investment opportunity in emerging markets...",
      date: "2024-01-24 11:15",
      recipients: ["potential.investors@example.com"],
      issues: [
        {
          type: "guarantees",
          description: "Claims of guaranteed returns",
          solution: "Remove guarantee claims and add appropriate risk disclosures"
        },
        {
          type: "urgency",
          description: "Creating false sense of urgency",
          solution: "Remove urgency language and present objective information"
        }
      ],
      status: "notification_sent"
    },
    {
      id: 3,
      sender: "Emily Chang",
      senderId: "emily.c",
      manager: "Sarah Johnson",
      subject: "Portfolio Strategy Updates",
      snippet: "Based on our proprietary research, we're adjusting portfolio allocations...",
      date: "2024-01-24 09:45",
      recipients: ["clients@example.com"],
      issues: [
        {
          type: "disclosures",
          description: "Missing required disclosures about investment strategy",
          solution: "Add standard disclosures about investment risks and limitations"
        }
      ],
      status: "resolved"
    }
  ],
  complianceRules: [
    "No guarantee claims",
    "Required performance disclaimers",
    "Proper risk disclosures",
    "No promissory statements",
    "Accurate credentials"
  ],
  statistics: {
    totalScanned: 1247,
    flagged: 23,
    resolved: 20,
    pending: 3
  }
};

const EmailCard = ({ email, onSelect }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'notification_sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending_review':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={() => onSelect(email)}
      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">{email.subject}</h3>
            <p className="text-sm text-gray-500 mt-1">
              From: {email.sender} · To: {email.recipients.join(', ')}
            </p>
            <p className="text-sm text-gray-600 mt-2">{email.snippet}</p>
            <div className="flex items-center gap-2 mt-2">
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-sm text-red-600">
                {email.issues.length} compliance {email.issues.length === 1 ? 'issue' : 'issues'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(email.status)}`}>
            {email.status.replace('_', ' ').charAt(0).toUpperCase() + email.status.slice(1).replace('_', ' ')}
          </span>
          <span className="text-sm text-gray-500">{email.date}</span>
        </div>
      </div>
    </div>
  );
};

const EmailDetail = ({ email, onBack }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-start mb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>
      <div className="flex gap-3">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Mark as Resolved
        </button>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
          Send Notification
        </button>
      </div>
    </div>

    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">{email.subject}</h2>
        <div className="flex gap-4 text-sm text-gray-500 mt-2">
          <span>From: {email.sender}</span>
          <span>To: {email.recipients.join(', ')}</span>
          <span>{email.date}</span>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p>{email.snippet}</p>
      </div>

      <div>
        <h3 className="font-medium mb-4">Compliance Issues</h3>
        <div className="space-y-4">
          {email.issues.map((issue, idx) => (
            <div key={idx} className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <h4 className="font-medium text-red-800">{issue.type.replace('_', ' ')}</h4>
                  <p className="text-sm text-red-700 mt-1">{issue.description}</p>
                  <div className="mt-3 p-3 bg-white rounded-lg border border-red-100">
                    <h5 className="text-sm font-medium">Recommended Solution:</h5>
                    <p className="text-sm text-gray-600 mt-1">{issue.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EmailSection = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Email Monitor</h1>
          <h2 className="text-2xl text-gray-500">Compliance Review</h2>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <select 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending_review">Pending Review</option>
              <option value="notification_sent">Notification Sent</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Total Scanned</div>
          <div className="text-2xl font-semibold mt-1">{mockEmailData.statistics.totalScanned}</div>
          <div className="text-sm text-emerald-600 flex items-center gap-1 mt-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            5% from last week
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Flagged</div>
          <div className="text-2xl font-semibold mt-1">{mockEmailData.statistics.flagged}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Resolved</div>
          <div className="text-2xl font-semibold mt-1">{mockEmailData.statistics.resolved}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Pending Review</div>
          <div className="text-2xl font-semibold mt-1">{mockEmailData.statistics.pending}</div>
        </div>
      </div>

      {selectedEmail ? (
        <EmailDetail 
          email={selectedEmail}
          onBack={() => setSelectedEmail(null)}
        />
      ) : (
        <div className="space-y-4">
          {mockEmailData.flaggedEmails
            .filter(email => filterStatus === 'all' || email.status === filterStatus)
            .map(email => (
              <EmailCard 
                key={email.id}
                email={email}
                onSelect={setSelectedEmail}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default EmailSection;