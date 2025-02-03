import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const auth = useSelector(state=>state.auth);

    if(auth.isAuthenticated===false){
        return <Navigate to={"/signin"} replace />;
    }

   return children;

}

export default ProtectedRoute;
