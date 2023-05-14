import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from "recoil";
import { userState } from 'state';
import moment from "moment";
import '../../style/ChatBubble.scss';

const ChatBubble = ({ message }) => {
    const user = useRecoilValue(userState);
    const { id, created_at, message: ms, author } = message;

    return (
        <>
            <div className={`ChatBubble ${author && author.nickname === user.userNickname ? 'sent' : 'received'}`}>
                <div>
                    <div className={`Author ${author && author.nickname === user.userNickname ? 'sent' : 'received'}`}>{author.nickname}</div>
                    <div className={`Message ${author && author.nickname === user.userNickname ? 'sent' : 'received'}`}>{ms}</div>
                </div>
                <div className={`Time ${author && author.nickname === user.userNickname ? 'sent' : 'received'}`}>
                    {moment(created_at).format('HH:mm')}
                </div>
            </div>
        </>
    );
};

export default ChatBubble;