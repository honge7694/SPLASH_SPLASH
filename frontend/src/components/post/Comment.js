import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { Comment as AntdComment } from '@ant-design/compatible';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { userState } from 'state';
import moment from "moment";


const Comment = ({comment}) => {
    const { id: comment_id, post, author: { avatar_url, email, id, name, nickname }, content, created_at} = comment;
    const user = useRecoilValue(userState);

    return (
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
            actions={ // TODO: Comment 수정 및 삭제 추가.
                (id===user['userId'])?
                    ([
                        <EditOutlined />,
                        <DeleteOutlined />
                    ]):([

                    ])
            }
        >

        </AntdComment>
    );
}

export default Comment;