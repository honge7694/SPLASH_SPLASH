import React from 'react';
import { Route, Routes } from 'react-router-dom'
import AppLayout from 'components/AppLayout';
import Home from './Home';
import AccountsRoutes from './accounts/index';


const Root = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={ <Home /> }></Route>
                <Route path="/accounts/*" element={ <AccountsRoutes /> }/>
            </Routes>
        </AppLayout>
    );
}

export default Root;