import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Signup from'./Signup';

const AccountsRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/signup" element={ <Signup /> }></Route>
                <Route path="/profile" element={ <Profile /> }></Route>
            </Routes>
        </>
    );
}

export default AccountsRoutes;