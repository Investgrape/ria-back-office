import { useState } from 'react';
import EmployeeSection from './components/EmployeeSection';
import AuditSection from './components/AuditSection';
import DocumentsSection from './components/DocumentsSection';
import DashboardContent from './components/DashboardContent';
import MarketingSection from './components/MarketingSection';
import EmailSection from './components/EmailSection';

// SVG Icons Components
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M16 13H8"/>
    <path d="M16 17H8"/>
    <path d="M10 9H8"/>
  </svg>
);

const MarketingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <path d="M3.29 7L12 12l8.71-5"/>
    <path d="M12 22V12"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { icon: ChartIcon, label: 'Dashboard', id: 'dashboard' },
    { icon: UserIcon, label: 'Employees', id: 'employees' },
    { icon: ShieldIcon, label: 'Audit', id: 'audit' },
    { icon: FileIcon, label: 'Documents', id: 'documents' },
    { icon: MarketingIcon, label: 'Marketing', id: 'marketing' },
    { icon: EmailIcon, label: 'Email', id: 'email' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'employees':
        return <EmployeeSection />;
      case 'audit':
        return <AuditSection />;
      case 'documents':
        return <DocumentsSection />;
      case 'marketing':
        return <MarketingSection />;
      case 'email':
        return <EmailSection />;
      default:
        return <DashboardContent />;
    }
  };

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
                <item.icon />
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
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MenuIcon />
              </button>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
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

        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;