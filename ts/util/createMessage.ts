import { Message } from "discord.js";

const db = globalThis.db;
const readfile = globalThis.readSql;

export default async function(message: Message): Promise<void> {
    // check if user exists in the db and isn't banned
    const readUser = await db.execute(readfile("readUsersById.sql"), [parseInt(message.author.id)]);

    if (!readUser[0][0].id) {
        // user isn't registered yet to the system
        await db.query(readfile("newUser.sql"), [parseInt(message.author.id)]);
    }

    db.execute(readfile("newMessage.sql"), [message.id, parseInt(message.guild.id), parseInt(message.author.id)]);
}