import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ClientAgreements from './components/ClientAgreements/ClientAgreements';

function App() {
  return (
    <Router basename="/ria-back-office">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agreements" element={<ClientAgreements />} />
          <Route path="/employees" element={<div>Employees</div>} />
          <Route path="/audit" element={<div>Audit</div>} />
          <Route path="/documents" element={<div>Documents</div>} />
          <Route path="/marketing" element={<div>Marketing</div>} />
          <Route path="/email" element={<div>Email</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;