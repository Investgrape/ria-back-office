import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  documentHealth: {
    percentage: 83.3,
    current: 125,
    total: 150,
    needsReview: 15,
    expired: 10
  },
  registrationStatus: [
    { state: 'CA', status: 'Current' },
    { state: 'NY', status: 'Current' },
    { state: 'TX', status: 'Pending' },
    { state: 'FL', status: 'Review Needed' }
  ],
  upcomingTasks: [
    { task: 'Form ADV Annual Update', due: '2024-01-30' },
    { task: 'Annual Compliance Review', due: '2024-02-15' },
    { task: 'Privacy Policy Update', due: '2024-02-28' }
  ],
  riskAssessment: [
    { category: 'Trading Compliance', score: 95 },
    { category: 'Documentation', score: 88 },
    { category: 'Client Agreements', score: 92 },
    { category: 'Cybersecurity', score: 85 },
    { category: 'Privacy', score: 90 }
  ],
  auditScores: [
    { date: 'Nov 25', score: 89 },
    { date: 'Dec 2', score: 93 },
    { date: 'Dec 9', score: 91 },
    { date: 'Dec 16', score: 94 },
    { date: 'Dec 23', score: 93 }
  ]
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    'Current': 'bg-emerald-100 text-emerald-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Review Needed': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const RiskMeter = ({ score }) => (
  <div className="flex items-center gap-2 flex-1">
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${
          score >= 90 ? 'bg-emerald-500' :
          score >= 80 ? 'bg-yellow-500' :
          'bg-red-500'
        }`}
        style={{ width: `${score}%` }}
      />
    </div>
    <span className="text-sm text-gray-600 w-8">{score}%</span>
  </div>
);

const DashboardContent = () => {
  const [timeframe, setTimeframe] = useState('1M');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Compliance Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your compliance status and tasks</p>
        </div>
        <div className="flex items-center gap-2">
          {['1W', '1M', '3M', '1Y', 'ALL'].map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded text-sm ${
                timeframe === period 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Document Health */}
        <Card>
          <h3 className="text-sm text-gray-500 mb-4">Document Health</h3>
          <div className="text-2xl font-semibold mb-4">{mockData.documentHealth.percentage}%</div>
          <div className="relative h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-8 border-emerald-500 border-t-gray-200" />
            </div>
          </div>
        </Card>

        {/* Registration Coverage */}
        <Card>
          <h3 className="text-sm text-gray-500 mb-4">Registration Coverage</h3>
          <div className="text-2xl font-semibold mb-4">
            {mockData.registrationStatus.filter(s => s.status === 'Current').length} States
          </div>
          <div className="space-y-3">
            {mockData.registrationStatus.map((reg, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{reg.state}</span>
                <StatusBadge status={reg.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <h3 className="text-sm text-gray-500 mb-4">Upcoming Tasks</h3>
          <div className="text-2xl font-semibold mb-4">{mockData.upcomingTasks.length}</div>
          <div className="space-y-3">
            {mockData.upcomingTasks.map((task, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-sm font-medium">{task.task}</div>
                <div className="text-xs text-gray-500">Due: {task.due}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <Card>
          <h3 className="text-sm font-medium mb-4">Risk Assessment</h3>
          <div className="space-y-4">
            {mockData.riskAssessment.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-36">{item.category}</span>
                <RiskMeter score={item.score} />
              </div>
            ))}
          </div>
        </Card>

        {/* Audit Score Trend */}
        <Card>
          <h3 className="text-sm font-medium mb-4">Audit Score Trend</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.auditScores}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  domain={[85, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  width={30}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#10B981', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;