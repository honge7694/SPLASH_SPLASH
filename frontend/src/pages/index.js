import React from 'react';
import { Route, Routes } from 'react-router-dom'
import AppLayout from 'components/AppLayout';
import Home from './Home';
import AccountsRoutes from './accounts/index';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';
import PostsRoutes from './post';


const Root = () => {
    return (
        <AppLayout>
            <Routes>
                <Route element={<LoginRequiredRoute />}>
                    <Route path="/" element={ <Home /> }></Route>
                </Route>
                <Route path="/accounts/*" element={ <AccountsRoutes /> }/>
                <Route path='/post/*' element= { <PostsRoutes /> } />
            </Routes>
        </AppLayout>
    );
}

export default Root;