import { Message } from "discord.js";
import * as Db from "res/types/database";
import * as usercache from "memory-cache";
import * as channelcache from "memory-cache";
import * as bancache from "memory-cache";

const db = globalThis.db;
const readfile = globalThis.readSql;

const sql = {
    users: {
        read: readfile("/res/sql/users/readUsersById.sql"),
        create: readfile("/res/sql/users/createUser.sql"),
        checkBan: readfile("/res/sql/users/checkForBan.sql"),
    },
    messages: {
        new: (origin: boolean) => readfile(`/res/sql/messages/${origin ? "origin" : "replicated"}/newMessage.sql`),
        find: (origin: boolean) => readfile(`/res/sql/messages/${origin ? "origin" : "replicated"}/findMessage.sql`),
        delete: (origin: boolean) => readfile(`/res/sql/messages/${origin ? "origin" : "replicated"}/deleteMessage.sql`),
    },
    server: {
        findChannel: readfile("/res/sql/servers/getChannelByLocal.sql"),
    }
};

function check(err: unknown): void {
    console.error(err);
}

// anti memory leak lol | clear cache every 3 hours
setInterval(() => {
    usercache.clear();
    channelcache.clear();
    bancache.clear();
}, globalThis.cacheTime);

export const createOriginMessage = async (message: Message): Promise<void> => {
    // check if user exists in the db and isn't banned

    const user: Db.User = usercache.get(message.author.id) || await db.execute(sql.users.read, [message.author.id]).catch(check).then((value) => {
        usercache.put(message.author.id, value[0][0]);
    })[0][0];

    if (!user.localid) {
        // user isn't registered yet to the system
        db.query(sql.users.create, [message.author.id]).catch(check);
    } else {
        const banDetails: Db.Bans = bancache.get(user.localid) || await db.query(sql.users.checkBan, ["user", user.localid]).catch(check).then((value) => {
            usercache.put(user.localid, value[0][0]);
        })[0][0];
        //  ban expiry isn't complete yet                            or not temp ban (aka permaban)
        if ((parseInt(banDetails.expiryDate) > new Date().getTime()) || !banDetails.temporary) {
            return;
        }
    }

    db.execute(sql.messages.new(true), [message.id, message.guild.id, message.author.id]).catch(check);
};

export const createReplicatedMessage = async (message: Message, localId: number): Promise<void> => {
    db.execute(sql.messages.new(false), [message.id, message.guild.id, localId]);
};

export const deleteMessage = async (messageId: string): Promise<void> => {
    const origin: Db.OriginMessage = await (db.execute(sql.messages.find(true), [messageId]).catch(check))[0][0];
    const replicated: Db.ReplicatedMessage[] = await (db.execute(sql.messages.find(false)).catch(check))[0];

    const getChannel = async (): Promise<string> => {
        const server: Db.Servers = await (db.query(sql.server.findChannel, [origin.server_origin]))[0][0];

        return new Promise((res, rej) => {
            channelcache.put(origin.server_origin, server.channel);
            res(server.channel);
        });
    };

    db.execute(sql.messages.delete(true), [origin.messageid]).catch(check);

    axios.delete(`/channels/${channelcache.get(origin.server_origin) || await getChannel()}/messages/${origin.messageid}`);

    replicated.forEach(async (value, index, array) => {
        axios.delete(`/channels/${channelcache.get(value.server) || await getChannel()}/messages/${value.messageid}`);
    });
};