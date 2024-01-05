import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { isAuthenticated } from './AuthService';

  export function PrivateRoute() {
    const auth = isAuthenticated()
   
    return (auth ? <Outlet /> : <Navigate to="/" />)
  }