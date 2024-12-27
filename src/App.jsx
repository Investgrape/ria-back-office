import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardContent from './components/DashboardContent';
import DocumentsSection from './components/DocumentsSection';
import EmailSection from './components/EmailSection';
import EmployeeSection from './components/EmployeeSection';
import MarketingSection from './components/MarketingSection';
import AuditSection from './components/AuditSection';
import ClientAgreements from './components/ClientAgreements/ClientAgreements';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/documents" element={<DocumentsSection />} />
          <Route path="/email" element={<EmailSection />} />
          <Route path="/employees" element={<EmployeeSection />} />
          <Route path="/marketing" element={<MarketingSection />} />
          <Route path="/audit" element={<AuditSection />} />
          <Route path="/agreements" element={<ClientAgreements />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;