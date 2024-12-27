import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import ClientAgreements from './components/ClientAgreements/ClientAgreements';

function App() {
  return (
    <Router basename="/ria-back-office">
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/agreements" element={<ClientAgreements />} />
              <Route path="/audit" element={<div>Audit Page</div>} />
              <Route path="/documents" element={<div>Documents Page</div>} />
              <Route path="/marketing" element={<div>Marketing Page</div>} />
              <Route path="/email" element={<div>Email Page</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;