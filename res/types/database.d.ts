export interface User {
    userid:          string;
    localid:         number;
}

export interface Servers {
    serverid:        string;
    localid:         string;
    channel:         string;
}

export interface Bans {
    id:              number;
    localid:         number;
    user:            boolean;
    server:          boolean;
    reason:          string;
    mod:             number;
    temporary:       boolean;
    startDate:       string;
    expiryDate?:     string;
}

export interface Moderation {
    userid:          string;
    localid:         number;
    mute:            boolean;
    delete:          boolean;
    unmute:          boolean;
    ban:             boolean;
    unban:           boolean;
}

export interface OriginMessage {
    id:              number;
    messageid:       string;
    server_origin:   number;
    author:          number;
    deleted:         boolean;
    mod_reason:      string;
    mod:             number;
}

export interface ReplicatedMessage {
    id:              number;
    originId:        number;
    server:          number;
}

