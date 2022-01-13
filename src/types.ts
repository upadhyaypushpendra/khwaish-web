export enum Section {
    chats = 'chats',
    find = 'find',
    profile = 'profile',
    requests = 'requests',
}

export enum ChatsSubSection {
    list,
    chat,
}

export enum RequestsSubSection {
    sent,
    received
}

export enum ProfileSubSection { }

export enum FndSubSection { }

export type SubSection = ChatsSubSection | RequestsSubSection | ProfileSubSection | FndSubSection;

export type Friend = {
    _id: string;
    name: string;
    phone: string;
    about: string;
    isTyping?: boolean;
}