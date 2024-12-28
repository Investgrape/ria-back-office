import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import AgreementManagement from './components/Agreements/AgreementManagement';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agreements" element={<AgreementManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;