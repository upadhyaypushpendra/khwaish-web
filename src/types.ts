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