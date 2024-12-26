import React from 'react';

const mockEmployees = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Investment Adviser",
    crd: "123456",
    ce_status: "Due in 30 days",
    registrations: ["Series 65", "CFP"],
    state_registrations: ["CA", "NY", "TX"],
    alerts: ["CE Due in 30 days", "U4 Update Required"]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Adviser",
    crd: "789012",
    ce_status: "Urgent",
    registrations: ["Series 66", "CFA"],
    state_registrations: ["CA", "FL", "IL"],
    alerts: ["CE Overdue", "Form U4 Amendment Needed"]
  }
];

const EmployeeCard = ({ employee }) => (
  <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div>
          <h3 className="font-medium">{employee.name}</h3>
          <p className="text-sm text-gray-500">{employee.title}</p>
          <p className="text-sm text-gray-500">CRD #{employee.crd}</p>
        </div>
      </div>
      <span className={`px-3 py-1 text-sm rounded-full ${
        employee.ce_status === 'Urgent' 
          ? 'bg-red-100 text-red-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {employee.ce_status}
      </span>
    </div>
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {employee.registrations.map((reg, idx) => (
          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {reg}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {employee.state_registrations.map((state, idx) => (
          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            {state}
          </span>
        ))}
      </div>
    </div>
    {employee.alerts.length > 0 && (
      <div className="mt-4 space-y-2">
        {employee.alerts.map((alert, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 bg-yellow-50 text-yellow-800 rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="text-sm">{alert}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const EmployeeSection = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-normal">Employees</h1>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Employee
        </button>
      </div>

      <div className="grid gap-4">
        {mockEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeSection;