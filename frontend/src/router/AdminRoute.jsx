import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const AdminRoute = ({children}) => {
  const { userRole } = useAuthContext();

  if (userRole === null) {
    return <p>Loading...</p>; // or spinner
  }

  if (userRole !== "admin") {
    return <Navigate to="/admin" />;
  }

  return children ? children : <Outlet />;
}

export default AdminRoute