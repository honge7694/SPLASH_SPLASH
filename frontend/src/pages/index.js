import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import AppLayout from 'components/AppLayout';
import Home from './Home';
import AccountsRoutes from './accounts/index';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';
import PostsRoutes from './post';
import MeetsRoutes from './meet';


const Root = () => {
    return (
        <RecoilRoot>
            <AppLayout>
                <Routes>
                    <Route path="/" element={ <Home /> }></Route>
                    <Route path="/accounts/*" element={ <AccountsRoutes /> }/>
                    <Route path='/post/*' element= { <PostsRoutes /> } />
                    <Route path='/meet/*' element={ <MeetsRoutes/> } />
                </Routes>
            </AppLayout>
        </RecoilRoot>
    );
}

export default Root;