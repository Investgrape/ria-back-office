import React from 'react';

const EmailActions = ({ selectedEmails, onClearSelection, onResolveSelected, onSendNotifications }) => {
  if (selectedEmails.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white px-6 py-3 rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="text-sm text-gray-600">
        <span className="font-medium">{selectedEmails.length}</span> emails selected
      </div>

      <div className="h-4 w-px bg-gray-200" />

      <div className="flex items-center gap-3">
        <button
          onClick={onResolveSelected}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Resolve Selected
        </button>

        <button
          onClick={onSendNotifications}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
          Send Notifications
        </button>

        <button
          onClick={onClearSelection}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmailActions;