import Login from '@/pages/login/Login';
import { APIOptions, PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import './App.css';
import { PrivateRoutes, PublicRoutes } from './models/routes';
import Dashboard from './pages/dashboard/Dashboard';
import store from './redux/store';
import RoutesWithNotFound from './utils/routesWithNotFound';

function App() {
  
  const config: APIOptions = {
    ripple: true,
  }

  return (
    <Provider store={store}>
      <PrimeReactProvider value={config}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path="/" element={<Navigate to={PrivateRoutes.Dashboard}/>}/>
              <Route path={`${PrivateRoutes.Dashboard}/*`} element={<Dashboard />}/>
              <Route path={PublicRoutes.Login} element={<Login />}/>
            </RoutesWithNotFound>
          </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  )
}

export default App
