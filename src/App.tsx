import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/ui/layout/header';
import { Sidebar } from './components/ui/layout/sidebar';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="pt-16 flex">
          <aside className="fixed left-0 w-64 h-full bg-white shadow-sm">
            <Sidebar />
          </aside>

          <main className="ml-64 flex-1 p-6">
            <Routes>
              <Route path="/dashboard" element={<div>Dashboard Content</div>} />
              <Route path="/employees" element={<div>Employees Content</div>} />
              <Route path="/audit" element={<div>Audit Content</div>} />
              <Route path="/documents" element={<div>Documents Content</div>} />
              <Route path="/marketing" element={<div>Marketing Content</div>} />
              <Route path="/email" element={<div>Email Content</div>} />
              <Route path="/agreements" element={<div>Agreements Content</div>} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}