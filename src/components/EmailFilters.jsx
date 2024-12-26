import React from 'react';

const EmailFilters = ({ filterStatus, setFilterStatus, filterDate, setFilterDate, filterSender, setFilterSender }) => {
  const dateOptions = [
    { label: 'Last 24 Hours', value: '24h' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'All Time', value: 'all' }
  ];

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      <div className="relative">
        <select
          className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending_review">Pending Review</option>
          <option value="notification_sent">Notification Sent</option>
          <option value="resolved">Resolved</option>
        </select>
        <svg 
          className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <div className="relative">
        <select
          className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        >
          {dateOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg 
          className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Filter by sender..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={filterSender}
          onChange={(e) => setFilterSender(e.target.value)}
        />
        <svg 
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>

      <button 
        onClick={() => {
          setFilterStatus('all');
          setFilterDate('all');
          setFilterSender('');
        }}
        className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EmailFilters;