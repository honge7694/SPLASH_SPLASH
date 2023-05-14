import React from 'react';
import { List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from "moment";


const HomePostList = ({data}) => {
    console.log(data);
    const { id, title, content, author, images, created_at } = data;
    const history = useNavigate();
    

    const handlerOnClick = (e, id) => {
        e.preventDefault();
        history('/post/'+id);
    }

    return (
        <div>
            <List
                dataSource={data}
                size='large'
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                }}
                renderItem={(item) => (
                    <List.Item>
                        <a href="#" onClick={ (e) => handlerOnClick(e, item.id) }>
                            <div>
                                {item.title}
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


export default HomePostList;