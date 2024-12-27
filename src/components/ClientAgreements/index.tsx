import React from 'react';
import { Card } from '../ui/card';

const ClientAgreements: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Client Agreements</h1>
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold">Active Agreements</h2>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-600">No active agreements found.</p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ClientAgreements;