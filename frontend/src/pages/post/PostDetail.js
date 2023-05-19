import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FrownOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import PostDetailLayout from "../../components/post/PostDetailLayout";
import { useAppContext } from 'store';
import { useResetRecoilState } from "recoil";
import { userState } from 'state';
import CommentList from 'components/post/CommentList';
import { axiosInstance } from 'api';


const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { store: token } = useAppContext();
    const history = useNavigate();
    const resetUser = useResetRecoilState(userState);
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    useEffect(() => {
        async function fetchPostData() { 
            const apiUrl = '/post/'+ id +'/'
            try{
                const { data } = await axiosInstance.get(apiUrl, { headers });
                setPost(data);

            } catch(error){
                console.error("error : ", error);
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
        fetchPostData();
    }, []);


    const handleLike = async () => {
        console.log('headers : ', headers);
        try{
            const response = await axiosInstance.post(`/post/${id}/like/`, '', { headers });
            const { data } = await axiosInstance.get('/post/'+ id +'/', { headers });
            setPost(data);
        }catch(error){
            console.log('error : ', error);
        }
    }

    // console.log(post);

    return (
        <>
            {post && <PostDetailLayout post={post} handleLike={handleLike}/> }
            {post && <CommentList />}
        </>
    );
}


export default PostDetail;