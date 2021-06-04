import { Message } from "discord.js";
import { Connection } from "mysql";

const db: Connection = globalThis.db;

export default function(message: Message): void {
    db.query(
        `INSERT INTO origin_message (messageid, server_origin, author)
        VALUES (
            ${message.id},
            (SELECT localid
             FROM servers
             WHERE serverid=${message.guild.id}),
            (SELECT localid
             FROM users
             WHERE localid=${message.author.id})
        )`); // TODO make check that server and user exists in their respective table
}