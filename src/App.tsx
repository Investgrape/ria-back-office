import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardContent from './components/DashboardContent';
import DocumentsSection from './components/DocumentsSection';
import EmailSection from './components/EmailSection';
import EmployeeSection from './components/EmployeeSection';
import MarketingSection from './components/MarketingSection';
import AuditSection from './components/AuditSection';
import ClientAgreements from './components/ClientAgreements';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<DashboardContent />} />
          <Route path="/documents" element={<DocumentsSection />} />
          <Route path="/email" element={<EmailSection />} />
          <Route path="/employees" element={<EmployeeSection />} />
          <Route path="/marketing" element={<MarketingSection />} />
          <Route path="/audit" element={<AuditSection />} />
          <Route path="/agreements" element={<ClientAgreements />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;