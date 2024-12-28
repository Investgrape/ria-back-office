import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import AgreementManagement from './components/Agreements/AgreementManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/agreements',
    element: <AgreementManagement />
  }
], { basename: '/ria-back-office' });