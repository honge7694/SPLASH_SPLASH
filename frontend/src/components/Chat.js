import React from "react";
import { Card, Button, Input } from "antd";


const Chat = ({style}) => {
    return (
        <div style={style}>
            <Card className="Chat" title="Chat" size='small' style={{ height: "auto" }} actions={[
                <Input.Group compact key="input">
                    <Input style={{ width: 'calc(100% - 100px)', }} placeholder="메시지를 입력하세요" />
                    <Button type="primary">Submit</Button>
                </Input.Group>
            ]} >
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
                <div>Chat...</div>
            </Card>
        </div>
    );
}

export default Chat;