import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FrownOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import Axios from 'axios';
import PostDetailLayout from "../../components/post/PostDetailLayout";
import { useAppContext } from 'store';
import { useResetRecoilState } from "recoil";
import { userState } from 'state';


const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { store: token } = useAppContext();
    const history = useNavigate();
    const resetUser = useResetRecoilState(userState);
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    useEffect(() => {
        async function fetchPostData() { 
            const apiUrl = 'http://localhost:8000/post/'+ id +'/'
            try{
                const { data } = await Axios.get(apiUrl, { headers });
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
            const response = await Axios.post(`http://localhost:8000/post/${id}/like/`, '', { headers });
            const { data } = await Axios.get('http://localhost:8000/post/'+ id +'/', { headers });
            setPost(data);
        }catch(error){
            console.log('error : ', error);
        }
    }

    // console.log(post);

    return (
        <>
            {post && <PostDetailLayout post={post} handleLike={handleLike}/> }
        </>
    );
}


export default PostDetail;