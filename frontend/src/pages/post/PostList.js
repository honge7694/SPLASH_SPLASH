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
    const apiUrl = 'http://localhost:8000/post/';
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    useEffect(() => {
        async function fetchPostList() { 
            try{
                const {data} = await Axios.get(apiUrl, { headers })
                setPostList(data);
            }catch(error){
                console.log("error : ", error);
            }
        }
        fetchPostList();
    }, [])

    // const data = postList.map((post) => {
    //     const { id, title, content, author, images, likes, is_like, created_at, updated_at } = post;
    //     return (
    //         ({
    //             id: { id },
    //             title: { title },
    //             content: { content },
    //             author: { author },
    //             images: { images },
    //             likes: { likes },
    //             is_like: { is_like },
    //             created_at: { created_at },
    //             updated_at: { updated_at },
    //         })
    //     )
    // });

    // console.log('data : ', data);
    // console.log('data : ', data[21].images.images[0]['image']);

    const handlerNew = (e) => {
        e.preventDefault();
        history('new');
    }

    const handleLike = async (post) => {
        console.log(post.item.id);
        try{
            const response = await Axios.post(`http://localhost:8000/post/${post.item.id}/like/`, '', { headers });
            const { data } = await Axios.get(apiUrl, { headers });
            setPostList(data);
        }catch(error){
            console.log('error : ', error);
        }
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
            {postList &&<PostListLayout data={postList} handleLike={handleLike}/>}
        </Card>
    );
}

export default PostList;