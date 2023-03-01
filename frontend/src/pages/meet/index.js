import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeetDetail from './MeetDetail';
import MeetsList from './MeetsList';


const MeetsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <MeetsList/> } />
            <Route path="/:id" element={ <MeetDetail/> } />
        </Routes>
    );
}

export default MeetsRoutes;