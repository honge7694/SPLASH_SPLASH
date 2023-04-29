import { useEffect, useRef } from 'react';
import { useAppContext } from 'store';







// class WebSocketInstance {
//     constructor() {
//         this.socketRef = null;
//         this.retry = 0;
        
//     }

//     reconnect() {
//         this.connect();
//     }

//     connect() {
//         if (this.socketRef) this.socketRef.close();

//         const path = `ws/chat/`
//         this.socketRef = new WebSocket(`ws://localhost:8000/${path}`, { headers: {'Authorization': `Bearer ${token}`}});
//         this.socketRef.onopen = () => {
//             console.log("웹소켓 서버 연결 성공.");
//             this.retry = 0;
//         };

//         this.socketRef.onmessage = (event) => {
//             const message_json = event.data;
//             console.log("메세지 수신 : ", message_json);
            
//         };

//         this.socketRef.onerror = () => {
//             console.error("웹소켓 에러 발생");
//         };

//         this.socketRef.onclose = (event) => {
//             if (event.wasClean) {
//                 console.log("socketRef.close()에 의한 연결 끊기")
//             } else {
//                 console.log("웹소켓 서버와의 네트워크 단절로 인한 끊김.");
//                 if(this.retry < 3) {
//                     this.retry += 1;
//                     setTimeout(() => {
//                         this.reconnect();
//                         console.log(`[${this.retry}] 접속 재시도...`);
//                     }, 1000 * this.retry);
//                 }
//             }
//         };
//     }

//     disconnect() {
//         this.socketRef.close();
//     }

//     sendMessage(data) {
//         if (this.socketRef.readyState === WebSocket.OPEN) {
//             console.log('sendMessage.data : ', data);
//             const { message, user } = data;
//             this.socketRef.send(
//                 JSON.stringify({
//                     type: "chat.message",
//                     message: message,
//                     sender: user,
//                 })
//             );
//         } else {
//             console.log("WebSocket is not open");
//         }
//     }

//     addCallbacks(onMessageReceived) {
//         this.callback = onMessageReceived;
//     }
// }

// const ChatWebSocket = new WebSocketInstance();

// export default ChatWebSocket;