import React from 'react';
import { List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from "moment";


const HomeMeetList = ({data}) => {
    console.log(data);
    const history = useNavigate();
    

    const handlerOnClick = (e, id) => {
        e.preventDefault();
        history('/meet/'+id);
    }

    return (
        <div>
            <List
                dataSource={data}
                size='large'
                
                renderItem={(item) => (
                    <List.Item>
                        <a href="#" onClick={ (e) => handlerOnClick(e, item.id) }>
                            <div>
                            <Typography.Text type={item.status}>[{item.status === 'success'? '모집중' : '모집종료'}]</Typography.Text>{item.title}
                            </div>
                        </a>
                            <div>
                                {item.author.nickname}
                                <div>
                                    {moment(item.created_at).format('YY-MM-DD HH:mm')}{}
                                </div>
                            </div>
                            
                    </List.Item>
                )}
            />
        </div>
    )
}


export default HomeMeetList;