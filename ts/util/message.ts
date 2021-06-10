import { Message } from "discord.js";

const db = globalThis.db;
const readfile = globalThis.readSql;

function check(err: unknown): void {
    console.error(err);
}

export const createMessage = async (message: Message): Promise<void> => {
    // check if user exists in the db and isn't banned

    const user = await db.execute(readfile("@sql/users/readUsersById.sql"), [message.author.id]).catch(check)[0];

    if (!user.id) {
        // user isn't registered yet to the system
        db.query(readfile("@sql/users/readUsersById.sql"), [message.author.id]).catch(check);
    } else {

    }

    db.execute(readfile("@sql/messages/origin/newMessage.sql"), [message.id, message.guild.id, message.author.id]).catch(check);
};

export const deleteMessage = async (messageId: string): Promise<void> => {
    const origin = await db.execute(readfile("@sql/messages/origin/findMessage.sql"), [messageId]).catch(check)[0];
    const replicated = await db.execute(readfile("@sql/messages/findMessage.sql")).catch(check)[0];

    db.execute(readfile("@sql/messages/origin/deleteMessage.sql"), [origin.deleted]).catch(check);
};