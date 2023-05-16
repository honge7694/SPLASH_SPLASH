import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Signup from'./Signup';
import UserArticle from './UserArticle';
import KakaoSignup from'./KakaoSignup';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';
import OAuth2RedirectHandler from 'components/accounts/OAuth2RedirectHandler';

const AccountsRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/signup" element={ <Signup /> }></Route>
                <Route path="/kakao/signup" element={ <KakaoSignup /> }></Route>
                <Route path="/kakao/callback" element={ <OAuth2RedirectHandler/> }></Route>

                <Route element={<LoginRequiredRoute />}>
                    <Route path="/article" element={ <UserArticle /> }></Route>
                    <Route path="/profile" element={ <Profile /> }></Route>
                </Route>
            </Routes>
        </>
    );
}

export default AccountsRoutes;