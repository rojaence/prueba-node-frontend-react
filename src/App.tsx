import './App.css'
import { PrimeReactProvider, APIOptions } from 'primereact/api'
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import Login from '@/pages/login/Login'
import RoutesWithNotFound from './utils/routesWithNotFound';
import { PrivateRoutes } from './models/routes';


function App() {
  
  const config: APIOptions = {
    ripple: true,
  }

  return (
    <PrimeReactProvider value={config}>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path='/' element={<Navigate to={PrivateRoutes.Dashboard}/>}/>
          <Route path={PrivateRoutes.Dashboard} element={'dashboard'}/>
          <Route path={PrivateRoutes.Users} element={'users'}/>
          <Route path={PrivateRoutes.Profile} element={'profile'}/>
          <Route path='/login' element={<Login />}/>
        </RoutesWithNotFound>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
