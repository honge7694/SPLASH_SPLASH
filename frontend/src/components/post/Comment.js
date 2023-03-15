import React, { useState } from 'react';
import { Avatar, Input, Modal, Tooltip } from 'antd';
import { Comment as AntdComment } from '@ant-design/compatible';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { userState } from 'state';
import Axios from 'axios';
import { useAppContext } from 'store';
import moment from "moment";


const Comment = ({comment, setCommentList, postId}) => {
    const { id: comment_id, post, author: { avatar_url, email, id, name, nickname }, content, created_at} = comment;
    const [editCommentContent, setEditCommentContent] = useState("");
    const [commentEditModal, setCommentEditModal] = useState(false);
    const [commentDeleteModal, setCommentDeleteModal] = useState(false);
    const user = useRecoilValue(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    const handleEditComment = (content) => {
        setEditCommentContent(content);
        setCommentEditModal(true);
    }

    const handleEditOk = async (comment_id) => {
        const apiUrl = 'http://localhost:8000/post/'+ postId +'/comment/' + comment_id + '/' 
        try {
            const response = await Axios.put(apiUrl, {content: editCommentContent}, {headers});
            const {data} = await Axios.get('http://localhost:8000/post/'+ postId +'/comment/', { headers });
            setCommentList(data);

        } catch(error){
            console.log(error);
        }
        setCommentEditModal(false);
    }

    const handleModalCancel = () => {
        setCommentEditModal(false);
        setCommentDeleteModal(false);
    }

    const handleDeleteComment = () => {
        setCommentDeleteModal(true);
    }

    const handleDeleteOk = async () => {
        const apiUrl = 'http://localhost:8000/post/'+ postId +'/comment/' + comment_id + '/' 
        try {
            const response = await Axios.delete(apiUrl, {headers});
            const {data} = await Axios.get('http://localhost:8000/post/'+ postId +'/comment/', { headers });
            setCommentList(data);

        } catch(error){
            console.log(error);
        }
        setCommentDeleteModal(true);
    }

    return (
        <>
            <AntdComment
                author={nickname}
                avatar={
                    <Avatar
                        src={"http://localhost:8000" + avatar_url}
                        alt={nickname + "의 avatar"}
                    />
                }
                content={
                    <p>
                        {content}
                    </p>
                }
                datetime={
                    <Tooltip title={moment(created_at).format("YYYY-MM-DD HH:mm:ss")}>
                        <span>{moment(created_at).fromNow()}</span>
                    </Tooltip>
                }
                actions={ 
                    (id===user['userId'])?
                        ([
                            <EditOutlined onClick={() => handleEditComment(content)} />,
                            <DeleteOutlined onClick={handleDeleteComment} />
                        ]):([

                        ])
                }
            >
            </AntdComment>
            <Modal title="Edit Comment" open={commentEditModal} onOk={() => handleEditOk(comment_id)} onCancel={handleModalCancel}>
                <Input.TextArea
                    style={{ marginBottom: ".5em" }}
                    value={editCommentContent}
                    onChange={e => setEditCommentContent(e.target.value)}
                />
            </Modal>
            <Modal title="Delete Comment" open={commentDeleteModal} onOk={handleDeleteOk} onCancel={handleModalCancel}>
                <p>정말 삭제하시겠습니까?</p>
            </Modal>
        </>
    );
}

export default Comment;