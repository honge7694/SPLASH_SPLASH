import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Signup from'./Signup';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';

const AccountsRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/signup" element={ <Signup /> }></Route>
                <Route element={<LoginRequiredRoute />}>
                    <Route path="/profile" element={ <Profile /> }></Route>
                </Route>
            </Routes>
        </>
    );
}

export default AccountsRoutes;