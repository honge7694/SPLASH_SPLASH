import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Card, Input } from 'antd';
import Axios from 'axios';
import { useAppContext } from 'store';
import Comment from './Comment';


const CommentList = () => {
    const { id } = useParams();
    const [commentContent, setCommentContent] = useState("");
    const [commentList, setCommentList] = useState();
    const apiUrl = 'http://localhost:8000/post/'+ id +'/comment/'
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    const handleCommentSave = async () => {
        try {
            const response = await Axios.post(apiUrl, {content: commentContent}, {headers});
            const {data} = await Axios.get(apiUrl, { headers });
            setCommentContent("");
            setCommentList(data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchCommentList() { 
            try{
                const {data} = await Axios.get(apiUrl, { headers })
                setCommentList(data);
                console.log("data : ", data);
            }catch(error){
                console.log("error : ", error);
            }
        }
        fetchCommentList();
    },[]) 

    return (
        <>
            <Card>
                <div>
                        <Input.TextArea
                            style={{ marginBottom: ".5em" }}
                            value={commentContent}
                            onChange={e => setCommentContent(e.target.value)}
                        />
                        <Button
                            block
                            type="primary"
                            disabled={commentContent.length === 0}
                            onClick={handleCommentSave}
                        >
                            댓글 쓰기
                        </Button>
                    </div>
                {commentList && commentList.map(comment => (
                    <Comment key={comment.id} comment={comment} setCommentList={setCommentList} postId={id} />
                ))}
            
            </Card>
        </>
    );
}

export default CommentList;