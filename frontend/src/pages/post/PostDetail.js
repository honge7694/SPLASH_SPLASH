import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios';
import PostDetailLayout from "../../components/post/PostDetailLayout";


const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        async function fetchPostData() { 
            const apiUrl = 'http://localhost:8000/post/'+ id +'/'
            try{
                const { data } = await Axios.get(apiUrl);
                setPost(data);

            } catch(error){
                console.error(error);
            }
        }
        fetchPostData();
    }, []);

    // console.log(post);

    return (
        <>
            {post && <PostDetailLayout post={post}/> }
        </>
    );
}


export default PostDetail;