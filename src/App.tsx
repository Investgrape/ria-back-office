import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import AgreementManagement from './components/Agreements/AgreementManagement';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'agreements',
        element: <AgreementManagement />
      },
      {
        path: '',
        element: <Dashboard />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;