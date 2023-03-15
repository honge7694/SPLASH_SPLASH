import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeetDetail from './MeetDetail';
import MeetsList from './MeetsList';
import MeetNew from './MeetNew';
import MeetEdit from './MeetEdit';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';


const MeetsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <MeetsList/> } />
            <Route path="/:id" element={ <MeetDetail/> } />
            <Route element={ <LoginRequiredRoute /> }>
                <Route path='/new' element={ <MeetNew /> }></Route>
                <Route path='/:id/edit' element={ <MeetEdit /> }></Route>
            </Route>
        </Routes>
    );
}

export default MeetsRoutes;