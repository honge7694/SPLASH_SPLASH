import React from "react";
import { Card, Button, Input } from "antd";
import '../../style/ChatLayout.scss';


const ChatLayout = ({style}) => {
    return (
        <div style={style}>
            <Card className="Chat" title="Chat" size='small' style={{ height: "auto" }} actions={[
                <Input.Group compact key="input">
                    <Input style={{ width: 'calc(100% - 100px)', textAlign: 'left'}} placeholder="메시지를 입력하세요" />
                    <Button type="primary">Submit</Button>
                </Input.Group>
            ]} >
            </Card>
        </div>
    );
}

export default ChatLayout;