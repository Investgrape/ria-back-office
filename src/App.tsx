import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import AgreementManagement from './components/Agreements/AgreementManagement';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/agreements',
        element: <AgreementManagement />
      }
      // Other routes...
    ]
  }
], {
  basename: '/ria-back-office'
});

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;