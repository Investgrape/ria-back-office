import React from 'react';
import { Card } from '../ui/card';

const DashboardContent: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold">Compliance Status</h2>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600">All systems operational</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;