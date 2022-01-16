export enum Section {
    chats = 'chats',
    find = 'find',
    profile = 'profile',
    requests = 'requests',
}

export enum ChatsSubSection {
    list = 'list',
    chat = 'chat',
}

export enum RequestsSubSection {
    sent = 'sent',
    received = 'received',
}

export enum ProfileSubSection {
    profile = 'profile',
}

export enum FndSubSection {
    find = 'find'
}

export type SubSection = ChatsSubSection | RequestsSubSection | ProfileSubSection | FndSubSection;

export type Friend = {
    _id: string;
    name: string;
    phone: string;
    about: string;
    isTyping?: boolean;
}

export enum WebSocketMessageAction {
    send_message = 'send_message',
    message_received = 'message_received',
}

export enum WebSocketMessageEvent {
    verify = 'verify',
    send_message = 'send_message',
    message_received = 'message_received',
    verified = 'verified',
    connected = 'connected',
    active_status = 'active_status',
    typing = 'typing',
}

export type WebSocketMessageData = {
    status: 'ok' | 'error',
    event: WebSocketMessageEvent,
    data: Record<string, any>,
}