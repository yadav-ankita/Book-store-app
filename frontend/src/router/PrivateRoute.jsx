import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';


const PrivateRoute = ({children}) => {
    const {currentUser}=useAuthContext();
    if(currentUser) {
        return children;
    }
    return <Navigate to="/login"/>
}

export default PrivateRoute