import React from 'react';
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const UserMeetList = () => {
    const data = [
        {
            id: 1,
            author: 'John Doe',
            title: 'First Post',
            createdAt: '2023-05-16',
        },
        {
            id: 2,
            author: 'Jane Smith',
            title: 'Second Post',
            createdAt: '2023-05-17',
        },
    ];
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={<a href={`/posts/${item.id}`}>{item.title}</a>}
                            description={`Author: ${item.author} | Created At: ${item.createdAt}`}
                        />
                    </List.Item>
        )}
        />
        </div>
    );
}

export default UserMeetList;