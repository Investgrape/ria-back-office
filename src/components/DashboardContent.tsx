import React from 'react';

const DashboardContent: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder content */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Compliance Status</h2>
          <p className="text-gray-600">All systems operational</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;