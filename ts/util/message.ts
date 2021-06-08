import { Message } from "discord.js";

const db = globalThis.db;
const readfile = globalThis.readSql;

export const createMessage = async (message: Message): Promise<void> => {
    // check if user exists in the db and isn't banned
    const readUser = await db.execute(readfile("@sql/users/readUsersById.sql"), [message.author.id]);

    if (!readUser[0][0].id) {
        // user isn't registered yet to the system
        await db.query(readfile("@sql/users/readUsersById.sql"), [message.author.id]);
    }

    db.execute(readfile("@sql/messages/newMessage.sql"), [message.id, message.guild.id, message.author.id]);
};

export const deleteMessage = async (messageId: string): Promise<void> => {
    const origin = await db.execute(readfile("@sql/messages/findMessage.sql"), [messageId]);
};