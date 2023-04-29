import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from "recoil";
import { userState } from 'state';
import '../../style/ChatBubble.scss';

const ChatBubble = ({ message }) => {
    const user = useRecoilValue(userState);
    // console.log('userNickname : ', user['userNickname'])
    const { id, created_at, message: ms, author } = message;
    // console.log("id, created_at, message, author: ", id, created_at, ms, author_id, nickname, avatar_url)
    return (
        // <div className={`chat-bubble ${sender === 'bot' ? 'bot' : 'user'}`}>
        <div>
            <p>{ms}</p>
        </div>
    );
    };

// ChatBubble.propTypes = {
//     message: PropTypes.string.isRequired,
//     sender: PropTypes.oneOf(['user', 'bot']).isRequired,
// };

export default ChatBubble;