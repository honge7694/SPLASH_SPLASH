import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, notification } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useResetRecoilState } from "recoil";
import { userState } from 'state';
import { useAppContext } from 'store';
import '../../style/post/PostList.scss';
import PostListLayout from 'components/post/PostListLayout';
import { axiosInstance } from 'api';


const PostList = () => {
    const [postList, setPostList] = useState([]);
    const history = useNavigate();
    const { store: token } = useAppContext();
    const resetUser = useResetRecoilState(userState);
    const apiUrl = '/post/';
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    useEffect(() => {
        async function fetchPostList() { 
            try{
                const {data} = await axiosInstance.get(apiUrl, { headers })
                setPostList(data);
            }catch(error){
                console.log("error : ", error);
                if (error.response.status === 403){
                    
                    notification.open({
                        message: '로그인 후 이용해주세요.',
                        description: '회원 정보를 확인할 수 없습니다.',
                        icon: <FrownOutlined style={{ color: "red" }}/>
                    });
                    
                    resetUser();
                    history('/accounts/login');
                }
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
            const response = await axiosInstance.post(`/post/${post.item.id}/like/`, '', { headers });
            const { data } = await axiosInstance.get(apiUrl, { headers });
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