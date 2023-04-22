import React, { useState, useEffect } from "react";
import { Card, Button, Form, Input } from "antd";
import ChatWebSocket from './WebsocketInstance'
import Websocket from 'react-websocket';
import '../../style/ChatLayout.scss';


const ChatLayout = ({style}) => {
    const [messages, setMessage] = useState([]);

    const handleData = (data) => {
        const message = JSON.parse(data);
        setMessage((prevMessages) => [...prevMessages, message])
    }

    const onFinish = () => {

    }


    useEffect(() => {
        ChatWebSocket.connect();
        return () => {
            ChatWebSocket.disconnect();
        };
    }, []);
    return (
        <div style={style}>
            <Card className="Chat" title="Chat" size='small' style={{ height: "auto" }} actions={[
                <Form
                onFinish={onFinish}
                layout="vertical"
                >
                    <Input.Group compact key="input">
                        <Input style={{ width: 'calc(100% - 100px)', textAlign: 'left'}} placeholder="메시지를 입력하세요" />
                        <Button type="primary">Submit</Button>
                    </Input.Group>
                </Form>
            ]} >
            </Card>
        </div>
    );
}

export default ChatLayout;