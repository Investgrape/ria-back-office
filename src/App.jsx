import { useState } from 'react';
import { 
  Search, Menu, User,
  BarChart, Shield, FileText,
  MessageSquare, Settings, Globe,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

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
    lastDowntime: 'None in last 30 days',
    requiredDisclosures: {
      total: 12,
      present: 11,
      missing: ['State-specific fee schedule']
    }
  }
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { icon: BarChart, label: 'Dashboard', id: 'dashboard' },
    { icon: User, label: 'Employees', id: 'employees' },
    { icon: Shield, label: 'Audit', id: 'audit' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: MessageSquare, label: 'Marketing', id: 'marketing' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-500" />
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-4">
              <Menu 
                className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                Run Audit
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-normal">Good afternoon,</h1>
                <h2 className="text-2xl text-gray-500">Compliance Manager</h2>
              </div>
              <div className="flex gap-8 text-right">
                <div>
                  <div className="text-sm text-gray-500">Website Status</div>
                  <div className="text-2xl text-emerald-600">Online</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Last Check</div>
                  <div className="text-2xl">{mockData.website.lastCheck}</div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
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
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Website Compliance Monitor
                    </h2>
                    <p className="text-sm text-gray-500">Last checked {mockData.website.lastCheck}</p>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-800">
                    ONLINE
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-500">Uptime (30 days)</div>
                    <div className="text-xl">{mockData.website.uptime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Required Disclosures</div>
                    <div className="text-xl">
                      {mockData.website.requiredDisclosures.present}/{mockData.website.requiredDisclosures.total}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Last Downtime</div>
                    <div className="text-xl">{mockData.website.lastDowntime}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;