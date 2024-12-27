import React, { useState } from 'react';
import { agreementsData } from '../data/agreements';

export default function ClientAgreements() {
  const [agreements, setAgreements] = useState(agreementsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showDetails, setShowDetails] = useState(null);

  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = 
      agreement.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.agreementType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || agreement.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Client Agreements</h2>
          <p className="text-sm text-gray-500">Manage and track client agreement statuses</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          <span className="material-icons-outlined mr-2">add</span>
          New Agreement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search agreements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded-md pr-10"
              />
              <span className="material-icons-outlined absolute right-3 top-2.5 text-gray-400">
                search
              </span>
            </div>
            <select 
              className="px-3 py-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Current">Current</option>
              <option value="Review Needed">Review Needed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client Name</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Agreement Type</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Last Updated</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Next Review</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAgreements.map((agreement) => (
              <React.Fragment key={agreement.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{agreement.clientName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{agreement.agreementType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      agreement.status === 'Current' ? 'bg-green-100 text-green-800' :
                      agreement.status === 'Review Needed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {agreement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{agreement.lastUpdated}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{agreement.nextReview}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowDetails(showDetails === agreement.id ? null : agreement.id)}
                    >
                      <span className="material-icons-outlined">expand_more</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <span className="material-icons-outlined">edit</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <span className="material-icons-outlined">delete</span>
                    </button>
                  </td>
                </tr>
                {showDetails === agreement.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-6 py-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900">AUM</h4>
                          <p className="text-gray-500">${agreement.details.aum.toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Fee Schedule</h4>
                          <p className="text-gray-500">{agreement.details.feeSchedule}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Services</h4>
                          <p className="text-gray-500">{agreement.details.services.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Signed Date</h4>
                          <p className="text-gray-500">{agreement.details.signedDate || 'Pending'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Version</h4>
                          <p className="text-gray-500">{agreement.version}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}