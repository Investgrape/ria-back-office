import React, { useState } from 'react';

const ClientAgreements = () => {
  const [showNewAgreement, setShowNewAgreement] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const ClientCard = ({ client }) => (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-colors border border-gray-200 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{client.name}</h3>
          <p className="text-sm text-gray-500">{client.email}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          client.status === 'active' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {client.agreements.map((agreement) => (
          <div 
            key={agreement.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedClient(client)}
          >
            <div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">{agreement.type}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {agreement.status === 'active' 
                  ? `Signed ${agreement.signedDate}`
                  : `Sent ${agreement.sentDate}`
                }
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs rounded-full ${
                agreement.status === 'active'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {agreement.status.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Client Agreements</h1>
          <p className="text-gray-500">Manage and send investment management agreements</p>
        </div>
        <button
          onClick={() => setShowNewAgreement(true)}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m-7-7h14" />
          </svg>
          New Agreement
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative flex-1">
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {/* New Agreement Modal */}
      {showNewAgreement && (
        <NewAgreementModal onClose={() => setShowNewAgreement(false)} />
      )}

      {/* Agreement Preview Modal */}
      {selectedClient && (
        <AgreementPreviewModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
};

const AgreementPreviewModal = ({ client, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-medium">{client.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{client.email}</p>
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

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {client.agreements.map((agreement) => (
          <div key={agreement.id} className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-medium">{agreement.type}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {agreement.status === 'active' 
                      ? `Signed on ${agreement.signedDate}`
                      : `Sent on ${agreement.sentDate}`
                    }
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  agreement.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {agreement.status.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Account Details</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Net Worth Range</dt>
                      <dd className="font-medium text-gray-900">{agreement.netWorth}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Fee Schedule</dt>
                      <dd className="font-medium text-gray-900">{agreement.feeSchedule}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Account Type</dt>
                      <dd className="font-medium text-gray-900">
                        {agreement.discretionary ? 'Discretionary' : 'Non-Discretionary'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Investment Profile</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Investment Objectives</dt>
                      <dd className="font-medium text-gray-900">
                        {agreement.investmentObjectives.join(', ')}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Risk Tolerance</dt>
                      <dd className="font-medium text-gray-900">{agreement.riskTolerance}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Time Horizon</dt>
                      <dd className="font-medium text-gray-900">{agreement.timeHorizon}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {agreement.status === 'active' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        Signed Electronically by {client.name}
                      </span>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-between">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          Close
        </button>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors">
            Download All Documents
          </button>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Send New Agreement
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ClientAgreements;