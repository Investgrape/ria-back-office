import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const mockData = {
  auditScores: [
    { date: 'Nov 25', score: 92 },
    { date: 'Dec 2', score: 93 },
    { date: 'Dec 9', score: 91 },
    { date: 'Dec 16', score: 94 },
    { date: 'Dec 23', score: 94 }
  ],
  regAlerts: [
    { type: 'SEC Filing', message: 'Form ADV Annual Update due in 30 days', priority: 'high' },
    { type: 'State Registration', message: 'Texas registration renewal required', priority: 'medium' },
    { type: 'Compliance', message: 'Annual compliance review upcoming', priority: 'medium' },
    { type: 'Cybersecurity', message: 'Security assessment needs review', priority: 'low' }
  ],
  upcomingTasks: [
    { id: 1, task: 'Form ADV Annual Update', deadline: '2024-01-30', assigned: 'Sarah Johnson', status: 'pending' },
    { id: 2, task: 'Annual Compliance Review', deadline: '2024-02-15', assigned: 'Michael Chen', status: 'in_progress' },
    { id: 3, task: 'Privacy Policy Update', deadline: '2024-02-28', assigned: 'Sarah Johnson', status: 'pending' }
  ],
  riskMetrics: [
    { category: 'Trading Compliance', score: 95 },
    { category: 'Documentation', score: 88 },
    { category: 'Client Agreements', score: 92 },
    { category: 'Cybersecurity', score: 85 },
    { category: 'Privacy', score: 90 }
  ],
  registrationStatus: [
    { state: 'CA', status: 'current', clientCount: 28, lastUpdated: '2024-01-15' },
    { state: 'NY', status: 'current', clientCount: 22, lastUpdated: '2024-01-15' },
    { state: 'TX', status: 'pending', clientCount: 18, lastUpdated: '2024-01-10' },
    { state: 'FL', status: 'review_needed', clientCount: 15, lastUpdated: '2024-01-05' }
  ],
  documentHealth: {
    total: 150,
    current: 125,
    needsReview: 15,
    expired: 10
  }
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>{children}</div>
);

const Alert = ({ alert }) => (
  <div className={`p-4 rounded-lg mb-3 ${
    alert.priority === 'high' ? 'bg-red-50 text-red-800' :
    alert.priority === 'medium' ? 'bg-yellow-50 text-yellow-800' :
    'bg-blue-50 text-blue-800'
  }`}>
    <div className="flex justify-between items-start">
      <div>
        <div className="font-medium">{alert.type}</div>
        <div className="text-sm mt-1">{alert.message}</div>
      </div>
      <button className="text-sm px-3 py-1 rounded-full border border-current hover:bg-white/10 transition-colors">
        View
      </button>
    </div>
  </div>
);

const TaskItem = ({ task }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800'
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
      <div>
        <div className="font-medium">{task.task}</div>
        <div className="text-sm text-gray-500 mt-1">
          Due: {task.deadline} · Assigned: {task.assigned}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.slice(1).replace('_', ' ')}
        </span>
        <button className="text-emerald-600 hover:text-emerald-700">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const RiskCard = ({ data }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span>{data.category}</span>
    <div className="flex items-center gap-3">
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${
            data.score >= 90 ? 'bg-emerald-500' :
            data.score >= 80 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${data.score}%` }}
        />
      </div>
      <span className="text-sm font-medium">{data.score}%</span>
    </div>
  </div>
);

const RegStatusBadge = ({ status }) => {
  const colors = {
    current: 'bg-emerald-100 text-emerald-800',
    pending: 'bg-yellow-100 text-yellow-800',
    review_needed: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>
      {status === 'review_needed' ? 'Review Needed' : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DashboardContent = () => {
  const COLORS = ['#10B981', '#FBBF24', '#EF4444'];
  const [timeframe, setTimeframe] = useState('1M');

  const documentData = [
    { name: 'Current', value: mockData.documentHealth.current },
    { name: 'Needs Review', value: mockData.documentHealth.needsReview },
    { name: 'Expired', value: mockData.documentHealth.expired }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-normal">Compliance Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your compliance status and tasks</p>
        </div>
        <div className="flex gap-2">
          {['1W', '1M', '3M', '1Y', 'ALL'].map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-sm ${timeframe === period ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card>
          <div className="text-sm text-gray-500 mb-2">Document Health</div>
          <div className="text-2xl font-semibold mb-4">
            {((mockData.documentHealth.current / mockData.documentHealth.total) * 100).toFixed(1)}%
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={documentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                >
                  {documentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-500 mb-2">Registration Coverage</div>
          <div className="text-2xl font-semibold mb-4">
            {mockData.registrationStatus.filter(s => s.status === 'current').length} States
          </div>
          <div className="space-y-2">
            {mockData.registrationStatus.map((reg, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm">{reg.state}</span>
                <RegStatusBadge status={reg.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-500 mb-2">Upcoming Tasks</div>
          <div className="text-2xl font-semibold mb-4">{mockData.upcomingTasks.length}</div>
          <div className="space-y-2">
            {mockData.upcomingTasks.slice(0, 3).map((task, idx) => (
              <div key={idx} className="text-sm">
                <div className="font-medium truncate">{task.task}</div>
                <div className="text-gray-500">Due: {task.deadline}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Charts and Lists */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-medium mb-4">Risk Assessment</h2>
            <div className="space-y-3">
              {mockData.riskMetrics.map((metric, idx) => (
                <RiskCard key={idx} data={metric} />
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-medium mb-4">Regulatory Alerts</h2>
            <div className="space-y-3">
              {mockData.regAlerts.map((alert, idx) => (
                <Alert key={idx} alert={alert} />
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
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
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Tasks Due</h2>
              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">View All</button>
            </div>
            {mockData.upcomingTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;