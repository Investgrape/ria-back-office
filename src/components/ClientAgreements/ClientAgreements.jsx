import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import NewAgreementForm from './NewAgreementForm';

const ClientAgreements = () => {
  const [showNewAgreement, setShowNewAgreement] = useState(false);
  const [agreements, setAgreements] = useState([
    {
      id: 1,
      clientName: 'John Smith',
      agreementType: 'Wrap Fee Agreement',
      status: 'Pending Signature',
      lastUpdated: '2024-12-26',
      version: '1.0',
      feeAmount: '1.25%',
      isDiscretionary: true
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      agreementType: 'Wrap Fee Agreement',
      status: 'Active',
      lastUpdated: '2024-12-25',
      version: '2.1',
      feeAmount: '1.5%',
      isDiscretionary: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleNewAgreement = (formData) => {
    const newAgreement = {
      id: agreements.length + 1,
      agreementType: 'Wrap Fee Agreement',
      status: 'Pending Signature',
      lastUpdated: new Date().toISOString().split('T')[0],
      version: '1.0',
      ...formData
    };

    setAgreements([...agreements, newAgreement]);
    setShowNewAgreement(false);
  };

  const filteredAgreements = agreements.filter(agreement =>
    agreement.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agreement.agreementType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Client Agreements</h2>
            <p className="mt-1 text-sm text-gray-500">Manage and create client investment advisory agreements</p>
          </div>
          <Button 
            onClick={() => setShowNewAgreement(true)}
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700"
          >
            <span className="material-icons-outlined text-sm mr-2">add</span>
            New Agreement
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <span className="material-icons-outlined text-lg">search</span>
              </span>
              <input
                type="text"
                placeholder="Search agreements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-sm pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Client Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Agreement Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Fee Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Discretionary</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Updated</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAgreements.map((agreement) => (
                  <tr key={agreement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{agreement.clientName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{agreement.agreementType}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        agreement.status === 'Active' ? 'bg-green-100 text-green-800' :
                        agreement.status === 'Pending Signature' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {agreement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{agreement.feeAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {agreement.isDiscretionary ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{agreement.lastUpdated}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-3">
                        <button className="text-gray-400 hover:text-gray-500">
                          <span className="material-icons-outlined text-sm">visibility</span>
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <span className="material-icons-outlined text-sm">download</span>
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <span className="material-icons-outlined text-sm">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <NewAgreementForm 
        isOpen={showNewAgreement}
        onClose={() => setShowNewAgreement(false)}
        onSubmit={handleNewAgreement}
      />
    </div>
  );
};

export default ClientAgreements;
