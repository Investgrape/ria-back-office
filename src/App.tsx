import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/ria-back-office">
      <Layout />
    </BrowserRouter>
  );
}

export default App;