import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Button, Card } from 'antd';
import { useAppContext } from 'store';
import '../../style/post/PostList.scss';
import PostListLayout from 'components/post/PostListLayout';


const PostList = () => {
    const [postList, setPostList] = useState([]);
    const history = useNavigate();
    const { store: token } = useAppContext();
    const apiUrl = 'http://localhost:8000/post/'

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token['jwtToken']}`};
        Axios.get(apiUrl)
            .then(response => {
                const { data } = response;
                console.log('PostList loaded response : ', response)
                setPostList(data);
            })
            .catch(error => {
                console.log('error : ', error);
            })
    }, [])

    const data = postList.map((post) => {
        const { id, title, content, author, images, created_at, updated_at } = post;
        return (
            ({
                id: { id },
                title: { title },
                content: { content },
                author: { author },
                images: { images },
                created_at: { created_at },
                updated_at: { updated_at },
            })
        )
    })

    // console.log('data : ', data);
    // console.log('data : ', data[21].images.images[0]['image']);

    const handlerNew = (e) => {
        e.preventDefault();
        history('new');
    }

    return (
        <Card
            title={
                <div className='PostList-Card-Title'>
                    자유게시판
                    <Button onClick={handlerNew}>글쓰기</Button>
                </div>
            }
        >
            <PostListLayout data={data}/>
        </Card>
    );
}

export default PostList;