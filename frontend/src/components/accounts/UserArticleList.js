import React from 'react';
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from "moment";


const UserPostList = ({data}) => {

    const renderDescription = (description) => {
        const maxLength = 15;
        if (description.length > maxLength) {
            console.log("max : ", description.length);
            return (`${description.slice(0, maxLength)}...`);
        }
        return description;
    };
    
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            // avatar={<Avatar icon={<UserOutlined />} />}
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <a href={`/post/${item.id}`}>{item.title}</a>
                                    <span>{moment(item.created_at).format('YY-MM-DD HH:mm')}</span>
                                </div>
                            }
                            description={`${renderDescription(item.content)}`}
                        />
                    </List.Item>
        )}
        />
        </div>
    );
}

export default UserPostList;