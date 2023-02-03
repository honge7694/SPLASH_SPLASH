import React from 'react';
import { Route, Routes } from 'react-router-dom'
import AppLayout from 'components/AppLayout';
import Home from './Home';
import AccountsRoutes from './accounts/index';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';


const Root = () => {
    return (
        <AppLayout>
            <Routes>
                <Route element={<LoginRequiredRoute />}>
                    <Route path="/" element={ <Home /> }></Route>
                </Route>
                <Route path="/accounts/*" element={ <AccountsRoutes /> }/>
            </Routes>
        </AppLayout>
    );
}

export default Root;