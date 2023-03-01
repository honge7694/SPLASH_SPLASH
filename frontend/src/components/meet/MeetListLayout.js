import React from 'react';
import { List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';



const MeetListLayout = ({data}) => {
    console.log(data);
    const history = useNavigate();
    
    const handlerOnClick = (e, id) => {
        e.preventDefault();
        history(''+id);
    }

    return (
        <>
            <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <a href="#" onClick={ (e) => handlerOnClick(e, item.id) }>
                            <Typography.Text type={item.status}>[{item.status === 'success'? '모집중' : '모집종료'}]</Typography.Text> {item.title}
                        </a>
                    </List.Item>
                )}
            />
        </>
    )
}

export default MeetListLayout;