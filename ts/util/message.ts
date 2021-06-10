import { Message } from "discord.js";
import * as Db from "res/types/database";
import * as usercache from "memory-cache";
import * as channelcache from "memory-cache";

const db = globalThis.db;
const readfile = globalThis.readSql;

const sql = {
    users: {
        read: readfile("@sql/users/readUsersById.sql"),
        create: readfile("@sql/users/createUser.sql"),
        checkBan: readfile("@sql/users/checkForBan.sql"),
    },
    messages: {
        new: (origin: boolean) => readfile(`@sql/messages/${origin ? "origin" : "replicated"}/newMessage.sql`),
        find: (origin: boolean) => readfile(`@sql/messages/${origin ? "origin" : "replicated"}/findMessage.sql`),
        delete: (origin: boolean) => readfile(`@sql/messages/${origin ? "origin" : "replicated"}/deleteMessage.sql`),
    },
    server: {
        findChannel: readfile("@sql/servers/getChannel.sql"),
    }
};

function check(err: unknown): void {
    console.error(err);
}

// anti memory leak lol
setInterval(() => {
    usercache.clear();
    channelcache.clear();
}, 10800000);

export const createOriginMessage = async (message: Message): Promise<void> => {
    // check if user exists in the db and isn't banned

    const user: Db.User = await db.execute(sql.users.read, [message.author.id]).catch(check)[0][0];

    if (!user.localid) {
        // user isn't registered yet to the system
        db.query(sql.users.create, [message.author.id]).catch(check);
    } else {
        const banDetails: Db.Bans = await db.query(sql.users.checkBan, ["user", user.localid]).catch(check)[0][0];
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