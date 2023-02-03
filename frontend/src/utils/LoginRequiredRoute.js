import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAppContext } from 'store';


const LoginRequiredRoute = ({ component, ...kwargs}) => {
    const { store: { isAuthenticated } } = useAppContext();
    const location = useLocation();

    if ( !isAuthenticated ) {
        return <Navigate to="/accounts/login" state={{ from: location}} />
    } 

    console.log("isAuthenticated : ", isAuthenticated);
    return (
        <Outlet {...kwargs}>

        </Outlet>
    )
}

export default LoginRequiredRoute;