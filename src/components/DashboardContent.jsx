import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const mockData = {
  auditScores: [
    { date: 'Nov 25', score: 92 },
    { date: 'Dec 2', score: 93 },
    { date: 'Dec 9', score: 91 },
    { date: 'Dec 16', score: 94 },
    { date: 'Dec 23', score: 94 }
  ],
  website: {
    lastCheck: '2 minutes ago',
    status: 'online',
    uptime: '99.9%',
    lastDowntime: 'None in last 30 days'
  },
  compliance: {
    totalTasks: 48,
    completed: 42,
    pending: 4,
    overdue: 2,
    nextDeadlines: [
      { task: 'Form ADV Annual Update', due: '2024-01-30' },
      { task: 'Code of Ethics Review', due: '2024-02-15' },
      { task: 'Cybersecurity Assessment', due: '2024-02-28' }
    ]
  },
  clientAgreements: [
    { status: 'Current', value: 85 },
    { status: 'Pending Update', value: 10 },
    { status: 'Expired', value: 5 }
  ],
  stateRegistrations: [
    { state: 'CA', clients: 28, status: 'Registered' },
    { state: 'NY', clients: 22, status: 'Registered' },
    { state: 'TX', clients: 18, status: 'Pending' },
    { state: 'FL', clients: 15, status: 'Review Required' }
  ]
};

const StatusCard = ({ title, value, status, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm text-gray-500">{title}</div>
      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
    </div>
    <div className="flex items-baseline justify-between">
      <div className="text-2xl font-semibold">{value}</div>
      <div className={`px-2 py-1 text-sm rounded-full ${
        status === 'positive' ? 'bg-emerald-100 text-emerald-800' :
        status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {status === 'positive' ? 'On Track' : status === 'warning' ? 'Attention' : 'Action Required'}
      </div>
    </div>
  </div>
);

const NextDeadlines = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">Upcoming Deadlines</h2>
    <div className="space-y-4">
      {mockData.compliance.nextDeadlines.map((deadline, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium">{deadline.task}</div>
            <div className="text-sm text-gray-500">Due: {deadline.due}</div>
          </div>
          <button className="px-3 py-1 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Review
          </button>
        </div>
      ))}
    </div>
  </div>
);

const StateRegistrations = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium mb-4">State Registration Status</h2>
    <div className="space-y-3">
      {mockData.stateRegistrations.map((state, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-medium">
              {state.state}
            </div>
            <div>
              <div className="text-sm font-medium">{state.clients} clients</div>
              <div className="text-xs text-gray-500">Min. Registration: 5 clients</div>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            state.status === 'Registered' ? 'bg-emerald-100 text-emerald-800' :
            state.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {state.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const DashboardContent = () => {
  const completionRate = Math.round((mockData.compliance.completed / mockData.compliance.totalTasks) * 100);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-normal">Good afternoon,</h1>
          <h2 className="text-2xl text-gray-500">Compliance Manager</h2>
        </div>
        <div className="flex gap-8 text-right">
          <div>
            <div className="text-sm text-gray-500">Completion Rate</div>
            <div className="text-2xl text-emerald-600">{completionRate}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Tasks Due</div>
            <div className="text-2xl text-yellow-600">{mockData.compliance.pending + mockData.compliance.overdue}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Audit Score Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Audit Score Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.auditScores}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[85, 100]}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* State Registrations */}
          <StateRegistrations />
        </div>

        <div className="space-y-6">
          {/* Client Agreement Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Client Agreement Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.clientAgreements}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#FBBF24" />
                    <Cell fill="#EF4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Next Deadlines */}
          <NextDeadlines />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;