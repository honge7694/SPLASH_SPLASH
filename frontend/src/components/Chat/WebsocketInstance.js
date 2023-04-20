class WebSocketInstance {
    constructor() {
        this.socketRef = null;
    }

    connect() {
        const path = `ws/echo/`
        this.socketRef = new WebSocket(`ws://localhost:8000/${path}`);
        this.socketRef.onopen = () => {
            console.log("웹소켓 서버 연결 성공.")
        };

        this.socketRef.onmessage = (event) => {
            const message = event.data;
            console.log("메세지 수신 : ", message)
        };

        this.socketRef.onerror = () => {
            console.error("웹소켓 에러 발생");
        };

        this.socketRef.onclose = (event) => {
            if (event.wasClean) {
                console.log("socketRef.close()에 의한 연결 끊기")
            } else {
                console.log("웹소켓 서버와의 네트워크 단절로 인한 끊김.");
            }
        };
    }

    disconnect() {
        this.socketRef.close();
    }

    sendMessage(message) {
        if (this.socketRef.readyState === WebSocket.OPEN) {
            this.socketRef.send(
            JSON.stringify({
                message: message,
                username: "anonymous",
            })
            );
        } else {
            console.log("WebSocket is not open");
        }
    }

    addCallbacks(onMessageReceived) {
        this.callback = onMessageReceived;
    }
}

const ChatWebSocket = new WebSocketInstance();

export default ChatWebSocket;