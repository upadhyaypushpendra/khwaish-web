import { ICloseEvent, IMessageEvent, w3cwebsocket as WebSocketClient } from 'websocket';
import { WebSocketMessageData, WebSocketMessageEvent } from '../types';
import Session from './Session';

class WebsocketClient {
    client: WebSocketClient | null = null;
    constructor() {
        this.client = null;
    }

    connectFailedHandler(error: Error) {
        console.log('Connect Error: ' + error.toString());
    }

    errorHandler(error: Error) {
        console.log('DEBUG::WebsocketClient->errorHandler ', error);
    }

    connectHandler() {
        console.log('DEBUG::WebsocketClient->connectHandler WebSocket Client Connected.');
        this.client?.send('Hello dudue whats the issue ');
    }

    messageHanlder(message: IMessageEvent) {
        console.log('DEBUG::WebsocketClient->messageHanlder: Message: ', message.data);
        if (typeof message.data === 'string') {
            const messageData = JSON.parse(message.data) as WebSocketMessageData;
            console.log('DEBUG::WebsocketClient->messageHanlder: MessageData: ', messageData);

            switch (messageData.event) {
                case "connected": {
                    console.log('DEBUG::WebsocketClient->messageHanlder: connected');
                    this.sendMessage({
                        status: 'ok',
                        event: WebSocketMessageEvent.verify,
                        data: {
                            tempID: messageData.data.tempID,
                            token: Session.accessToken,
                        }
                    });
                    break;
                }
                default:
                    console.log('DEBUG::WebsocketClient->messageHanlder: default');
                    break;
            }
        }
    }

    retryConnection() {
        console.error('DEBUG::WebsocketClient->retryConnection:');
        if (this.client?.readyState !== this.client?.OPEN) {
            this.client = null;
            this.connect();
            setTimeout(() => this.retryConnection(), 5000);
        }
    }
    connectionCloseHandler(event: ICloseEvent) {
        console.error('DEBUG::WebsocketClient->connectionCloseHandler: Connection closed.', event);
        // Retry connecting
        this.retryConnection();
    }

    sendMessage(data: WebSocketMessageData) {
        if (this.client?.readyState === this.client?.OPEN) {
            console.error('DEBUG::WebsocketClient->sendMessage: sending message: ', data);
            this.client?.send(JSON.stringify(data));
        } else {
            console.error('DEBUG::WebsocketClient->sendMessage: Unable to send message.');
        }
    }

    closeConnection() {
        this.client?.close();
        this.client = null;
    }

    connect() {
        console.log('DEBUG::WebsocketClient->connect: begin');
        if (this.client) return;
        if (process.env.REACT_APP_WEBSOCKET_SERVER_URL) {
            console.log('DEBUG::WebsocketClient->connect: Connecting to websocket');
            this.client = new WebSocketClient(
                process.env.REACT_APP_WEBSOCKET_SERVER_URL,
                'echo-protocol'
            );
            this.client.onerror = this.connectFailedHandler;
            this.client.onopen = this.connectHandler;
            this.client.onmessage = this.messageHanlder;
            this.client.onclose = this.connectionCloseHandler;
        }
        else {
            console.error('DEBUG::WebsocketClient->connect: websocket url not present');
        }
    }
}


export default new WebsocketClient();