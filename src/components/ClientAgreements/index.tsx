import React, { useState } from 'react';
import { Plus, Search, Filter, Download, PlayCircle, AlertCircle } from 'lucide-react';

interface Agreement {
  id: string;
  clientName: string;
  type: string;
  status: 'pending' | 'active' | 'expired';
  dateCreated: string;
  lastModified: string;
}

export default function ClientAgreements() {
  const [agreements, setAgreements] = useState<Agreement[]>([
    {
      id: '1',
      clientName: 'John Doe',
      type: 'Investment Management Agreement',
      status: 'active',
      dateCreated: '2024-01-15',
      lastModified: '2024-01-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAuditing, setIsAuditing] = useState(false);

  const handleRunAudit = () => {
    setIsAuditing(true);
    // Add audit logic here
    setTimeout(() => setIsAuditing(false), 2000); // Simulated audit process
  };

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Client Agreements</h1>
            <p className="text-gray-600">Manage and track all client agreements and their status</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleRunAudit}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isAuditing 
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isAuditing ? (
                <>
                  <AlertCircle size={20} />
                  Running Audit...
                </>
              ) : (
                <>
                  <PlayCircle size={20} />
                  Run Audit
                </>
              )}
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Plus size={20} />
              New Agreement
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Total Agreements</h3>
            <p className="text-2xl font-semibold mt-1">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Active Agreements</h3>
            <p className="text-2xl font-semibold mt-1 text-green-600">18</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Pending Signatures</h3>
            <p className="text-2xl font-semibold mt-1 text-yellow-600">4</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Expiring Soon</h3>
            <p className="text-2xl font-semibold mt-1 text-red-600">2</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search agreements..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            className="border rounded-lg px-4 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Download size={20} />
          Export
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agreement Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {agreements.map((agreement) => (
              <tr key={agreement.id}>
                <td className="px-6 py-4 whitespace-nowrap">{agreement.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{agreement.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${agreement.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                    ${agreement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${agreement.status === 'expired' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {agreement.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{agreement.dateCreated}</td>
                <td className="px-6 py-4 whitespace-nowrap">{agreement.lastModified}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="ml-4 text-gray-600 hover:text-gray-800">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}