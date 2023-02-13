import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import AppLayout from 'components/AppLayout';
import Home from './Home';
import AccountsRoutes from './accounts/index';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';
import PostsRoutes from './post';


const Root = () => {
    return (
        <RecoilRoot>
            <AppLayout>
                <Routes>
                    <Route element={<LoginRequiredRoute />}>
                        <Route path="/" element={ <Home /> }></Route>
                    </Route>
                    <Route path="/accounts/*" element={ <AccountsRoutes /> }/>
                    <Route path='/post/*' element= { <PostsRoutes /> } />
                </Routes>
            </AppLayout>
        </RecoilRoot>
    );
}

export default Root;