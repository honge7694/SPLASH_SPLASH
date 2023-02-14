import React from 'react';
import { Card } from 'antd';
import PostNewForm from '../../components/post/PostNewForm';


const PostNew = () => {
    return (
        <Card title='새 포스팅 쓰기'>
            <PostNewForm />
        </Card>
    );
}

export default PostNew;