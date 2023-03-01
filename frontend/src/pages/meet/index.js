import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeetsList from './MeetsList';


const MeetsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <MeetsList/> } />
        </Routes>
    );
}

export default MeetsRoutes;