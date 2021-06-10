import { Message } from "discord.js";
import * as Db from "res/types/database";
import * as usercache from "memory-cache";
import * as channelcache from "memory-cache";

const db = globalThis.db;
const readfile = globalThis.readSql;

function check(err: unknown): void {
    console.error(err);
}

// anti memory leak lol
setInterval(() => {
    usercache.clear();
    channelcache.clear();
}, 10800000);

export const createMessage = async (message: Message): Promise<void> => {
    // check if user exists in the db and isn't banned

    const user: Db.User = await db.execute(readfile("@sql/users/readUsersById.sql"), [message.author.id]).catch(check)[0][0];

    if (!user.localid) {
        // user isn't registered yet to the system
        db.query(readfile("@sql/users/readUsersById.sql"), [message.author.id]).catch(check);
    } else {
        const banDetails: Db.Bans = await db.query(readfile("@sql/users/checkForBan.sql"), ["user", user.localid]).catch(check)[0][0];
        if ((parseInt(banDetails.expiryDate) > new Date().getTime()) || !banDetails.temporary) {
            return;
        }
    }

    db.execute(readfile("@sql/messages/origin/newMessage.sql"), [message.id, message.guild.id, message.author.id]).catch(check);
};

export const deleteMessage = async (messageId: string): Promise<void> => {
    const origin: Db.OriginMessage = await (db.execute(readfile("@sql/messages/origin/findMessage.sql"), [messageId]).catch(check))[0][0];
    const replicated: Db.ReplicatedMessage[] = await (db.execute(readfile("@sql/messages/findMessage.sql")).catch(check))[0];

    const getChannel = async (): Promise<string> => {
        const server: Db.Servers = await (db.query(readfile("@sql/servers/getChannel.sql"), [origin.server_origin]))[0][0];

        return new Promise((res, rej) => {
            channelcache.put(origin.server_origin, server.channel);
            res(server.channel);
        });
    };

    db.execute(readfile("@sql/messages/origin/deleteMessage.sql"), [origin.messageid]).catch(check);

    axios.delete(`/channels/${channelcache.get(origin.server_origin) || await getChannel()}/messages/${origin.messageid}`);
};