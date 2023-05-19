import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Form, Input, Space } from "antd";
import { axiosInstance } from 'api'
import { useRecoilValue } from "recoil";
import { userState } from 'state';
import { useAppContext } from 'store';
import ChatBubble from './ChatBubble';
import '../../style/ChatLayout.scss';


const ChatLayout = ({style}) => {
    const user = useRecoilValue(userState);
    const { store: token } = useAppContext();

    const [form] = Form.useForm();
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const retryRef = useRef(0);
    const chatInput = useRef(null);
    const chatContainerRef = useRef(null);
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    console.log("messages : ", messages);

    const connect = () => {
        if (socketRef.current) socketRef.current.close();

        const path = 'ws/chat/';
        socketRef.current = new WebSocket(`ws://localhost:8000/${path}`,
            // { headers }
        );

        socketRef.current.onopen = () => {
            console.log('웹소켓 서버 연결 성공');
            retryRef.current = 0;
        }

        socketRef.current.onmessage = (event) => {
            const message_json = event.data;
            console.log("메세지 수신 : ", message_json);
            const message = JSON.parse(message_json);
            const chatData = async () => {
                try {
                    const { data } = await axiosInstance.get('/chat/');
                    console.log("메시지 저장 성공 data : ", [data.slice(-1)[0]]);
                    setMessages(prevMessages => [...prevMessages, data.slice(-1)[0]]);
                } catch(error) {
                    console.log(error);
                }
            }
            chatData();
            // setMessages((prevMessages) => [...prevMessages, message]);
            
        };

        socketRef.current.onerror = () => {
            console.error('웹소켓 에러 발생');
        };

        socketRef.current.onclose = (event) => {
            if (event.wasClean && socketRef.current) {
                console.log('socketRef.close()에 의한 연결 끊기');
            } else {
                console.log('웹소켓 서버와의 네트워크 단절로 인한 끊김.');
                if (retryRef.current < 3) {
                    retryRef.current += 1;
                    setTimeout(() => {
                    connect();
                    console.log(`[${retryRef.current}] 접속 재시도...`);
                    }, 1000 * retryRef.current);
                }
            }
        };
    };

    useEffect(() => {
        const chatData = async () => {
            try {
                const { data } = await axiosInstance.get('/chat/');
                setMessages(prevMessages => [...prevMessages, ...data]);
            } catch(error) {
                console.log(error);
            }
        }
        chatData();
    }, []);

    useEffect(() => {
        connect();

        if (chatInput.current) {
            chatInput.current.focus();
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log('웹소켓 연결 해제');
            }
        };

    }, []);

    useEffect(() => {
        chatContainerRef.current.scrollIntoView({ behavior: 'smooth'});
    }, [messages]);

    const onFinish = (values) => {
        // e.preventDefault();
        const { message } = values;
        const data = {
            "message": message,
            "user": user['userId'],
        }

        // 채팅 포커스
        form.resetFields();

        if (socketRef.current.readyState === WebSocket.OPEN) {
            console.log('sendMessage.data : ', data);
            const { message, user } = data;
            socketRef.current.send(
                JSON.stringify({
                    type: 'chat.message',
                    message: message,
                    sender: user,
                })
            );

            // 채팅 메시지를 서버에 저장
            axiosInstance.post('/chat/', {
                message: message,
            }, { headers })
            .then(res => {
                console.log('메시지 저장 성공', res);
            })
            .catch(err => {
                console.log('메시지 저장 실패', err);
            });


        } else {
            console.log('WebSocket is not open');
        }

    }

    const headStyle = {
        background: '#ffffff',
    };

    return (
        <div style={style}>
            <Card className="Chat" title="Chat" size='small' style={{ height: "auto" }} actions={[
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="message" >
                        <Space.Compact
                            style={{
                                width: '95%',
                            }}
                        >
                            { user['userId'] == null ? (
                                <div>
                                    <>
                                        <Input placeholder="로그인이 필요합니다." ref={chatInput} disabled={true} />
                                        <Button type="primary">Submit</Button>
                                    </>
                                </div>
                            ) : (
                                <>
                                    <Input placeholder="입력해주세요" ref={chatInput} />
                                    <Button type="primary">Submit</Button>
                                </>
                            )}
                        </Space.Compact>
                    </Form.Item>
                </Form>
            ]} >
                {messages.map((message, index) => (
                    // console.log("map 실행"),
                    <ChatBubble key={index} message={message} />
                ))}
                <div ref={chatContainerRef}></div>
            </Card>
        </div>
    );
}

export default ChatLayout;