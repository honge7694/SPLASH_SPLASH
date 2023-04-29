from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class ChatConsumer(JsonWebsocketConsumer):
    SQUARE_GROUP_NAME = "square"
    groups = [SQUARE_GROUP_NAME]

    def receive_json(self, content, **kwargs):
        user = self.scope["user"]
        print('user : ', user)
        _type = content['type']

        if _type == 'chat.message':
            sender = user.username
            message = content['message']
            async_to_sync(self.channel_layer.group_send)(
                self.SQUARE_GROUP_NAME,
                {
                    "type": "chat.message",
                    "message": message,
                    "sender": sender,
                }
            )
        else:
            print(f"Invalid message type : ${_type}")
    
    def chat_message(self, message_dict):
        self.send_json({
            "type": "chat.message",
            "message": message_dict['message'],
            "sender": message_dict['sender'],
        })