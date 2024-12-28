import React, { useState } from 'react';
import { Dialog } from '@radix-ui/react-dialog';
import { Plus, Search, Filter, Download } from 'lucide-react';

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
    },
    // Add more sample data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Client Agreements</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          New Agreement
        </button>
      </div>

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