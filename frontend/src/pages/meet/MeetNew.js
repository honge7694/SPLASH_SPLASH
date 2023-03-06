import React from 'react';
import MeetNewForm from './../../components/meet/MeetNewForm';
import { Card } from 'antd';


const MeetNew = () =>{
    return (
        <Card title="새 일정 작성">
            <MeetNewForm />
        </Card>
    );
}

export default MeetNew;