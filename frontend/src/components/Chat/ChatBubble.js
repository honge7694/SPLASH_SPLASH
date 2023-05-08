import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from "recoil";
import { userState } from 'state';
import '../../style/ChatBubble.scss';

const ChatBubble = ({ message }) => {
    const user = useRecoilValue(userState);
    // TODO: 말풍선 및 보낸이 오른쪽 보내기.
    // console.log('userNickname : ', user['userNickname'])
    const { id, created_at, message: ms, author } = message;
    // console.log(author);

    return (
        <div className={`ChatBubble ${author && author.nickname === user.userNickname ? 'sent' : 'received'}`}>
            <div>
                <div className='Author'>{author.nickname}</div>
                <div>{ms}</div>
            </div>
        </div>
    );
};

export default ChatBubble;