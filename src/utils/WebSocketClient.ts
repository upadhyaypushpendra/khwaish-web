import { w3cwebsocket as W3CWebSocket } from "websocket";
import { WebSocketMessageEvent } from "../types";
import Session from "./Session";

class WebsocketClient {
    webSocketServerUrl = process.env.REACT_APP_WEBSOCKET_SERVER_URL as string;
    client: W3CWebSocket | null = null;
    retryLeft = 3;
    messageListeners: any[] = [];
    constructor() {
        this.messageListeners = [{ event: WebSocketMessageEvent.connected, listener: this.connectionEventHandler }];
    }

    connectionEventHandler = ({ tempId }: any) => {
        const intervalId = setInterval(() => {
            if (this.sendMessage({
                event: WebSocketMessageEvent.verify,
                data: {
                    tempId: tempId,
                    token: Session.accessToken,
                }
            }) || this.retryLeft < 0) {
                clearInterval(intervalId);
            }
            this.retryLeft = this.retryLeft - 1;
        }, 1000)
    };

    addMessageListener = (event: WebSocketMessageEvent, listener: (data: any) => void) => {
        this.messageListeners.push({ event, listener });
    }

    connectFailedHandler = (error: any) => {
        console.log('Connect Error: ' + error.toString());
    }

    errorHandler = (error: any) => {
        console.log('DEBUG::WebsocketClient->errorHandler ', error);
    }

    connectHandler = () => {
        console.log('DEBUG::WebsocketClient->connectHandler WebSocket Client Connected.');
        this.retryLeft = 3;
    }

    messageHanlder = (message: any) => {
        // console.log('DEBUG::WebsocketClient->messageHanlder: Message: ', message.data);
        if (typeof message.data === 'string') {
            const messageData = JSON.parse(message.data);
            // console.log('DEBUG::WebsocketClient->messageHanlder: MessageData: ', messageData);
            for (const messageListener of this.messageListeners) {
                if (messageListener.event === messageData.event) messageListener.listener(messageData.data);
            }
        }
    }

    retryConnection = () => {
        console.error('DEBUG::WebsocketClient->retryConnection:', new Date().getSeconds());
        if (this.client?.readyState === this.client?.OPEN) return;

        if (this.retryLeft > 0) {
            this.retryLeft = this.retryLeft - 1;
            this.connect();
            setTimeout(() => this.retryConnection(), 5000 * this.retryLeft);
        }
    }

    connectionCloseHandler = (event: any) => {
        console.error('DEBUG::WebsocketClient->connectionCloseHandler: Connection closed.', event);
        // Retry connecting
        this.retryConnection();
    }

    sendMessage = (data: any) => {
        if (this.client?.readyState === this.client?.OPEN) {
            // console.log('DEBUG::WebsocketClient->sendMessage: sending message: ', data);
            this.client?.send(JSON.stringify(data));
            return true;
        } else {
            console.error('DEBUG::WebsocketClient->sendMessage: Unable to send message.');
            return false;
        }
    }

    closeConnection = () => {
        this.client?.close();
    }

    connect = () => {
        // console.log('DEBUG::WebsocketClient->connect: begin');

        if (this.webSocketServerUrl) {
            // console.log('DEBUG::WebsocketClient->connect: Connecting to websocket');
            this.client = new W3CWebSocket(this.webSocketServerUrl, 'echo-protocol');
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