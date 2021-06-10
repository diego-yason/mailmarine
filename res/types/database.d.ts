export interface DbUser {
    userid:          string;
    localid:         number;
}

export interface DbServers {
    serverid:        string;
    localid:         string;
}

export interface DbBans {
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

export interface DbModeration {
    userid:          string;
    localid:         number;
    mute:            boolean;
    delete:          boolean;
    unmute:          boolean;
    ban:             boolean;
    unban:           boolean;
}

export interface DbOriginMessage {
    id:              number;
    messageid:       string;
    server_origin:   number;
    author:          number;
    deleted:         boolean;
    mod_reason:      string;
    mod:             number;
}

export interface DbReplicatedMessage {
    id:              number;
    originId:        number;
    server:          number;
}

