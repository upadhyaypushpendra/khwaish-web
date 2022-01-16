import WebSocketClient from './WebSocketClient';

export type ChatControllerParams = { messages: [], senderId: string, receiverId: string };

export type ChatMessage = {
    id?: string;
    type: 'text';
    content: string;
    self?: boolean;
    from?: string;
    to?: string;
    sentTime?: string;
    delivered?: boolean;
    read?: boolean;
};

export default class ChatController {
    messages: ChatMessage[];
    senderId: string;
    receiverId: string;
    constructor({ messages, senderId, receiverId }: ChatControllerParams) {
        this.messages = messages;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }

    addMessage(message: ChatMessage) {
        message.id = Date.now().toString();
        this.messages.push(message);
    }

    removeMessage(id: string) {
        this.messages = this.messages.filter(message => message.id !== id);
    }

    sendMessage(message: ChatMessage) {
        message.self = true;
        message.delivered = false;
        message.read= false;
        message.sentTime = new Date().toISOString();

        this.addMessage(message);

        // Send Messsage to user
        WebSocketClient.sendMessage({
            event: 'send_message',
            data: {
                to: this.receiverId,
                from: this.senderId,
                ...message,
            }
        });
    }
}