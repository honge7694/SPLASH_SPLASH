import React from 'react';
import { Badge, Calendar } from 'antd';
import '../../style/meet/CalendarLayout.scss';


const CalendarLayout = ({data}) => {
    
    const dateCellRender = (value) => {
        const calendarDate = data.filter(item => (
            item.date_at.includes((value).format("YYYY-MM-DD"))
        ));
        return (
            <ul className="events">
                {calendarDate.map(item => (
                    <li key={item.id}>
                        <Badge status={item.status} text={item.title}/>
                    </li>
                ))}
            </ul>
        )
    }

    return(
        <>
            <Calendar fullscreen={true} dateCellRender={dateCellRender}/>
        </>
    );
}

export default CalendarLayout;