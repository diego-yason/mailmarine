import { Message } from "discord.js";
import { Connection } from "mysql";

const db: Connection = globalThis.db;

const cache: string[] = [];

export default function(message: Message): void {
    if (!cache.indexOf(message.author.id)) {
        db.query(`
        SELECT userid
        FROM users
        WHERE userid=${parseInt(message.author.id)};`, (error, results, fields) => {
            if (error) {
                return;
            }
            if (results.length != 1) {
                return;
            }
            cache.push(message.author.id);
        });
    }

    db.query(
        `INSERT INTO origin_message (messageid, server_origin, author)
        VALUES (
            ${message.id},
            (SELECT localid
             FROM servers
             WHERE serverid=${parseInt(message.guild.id)}),
            (SELECT localid
             FROM users
             WHERE localid=${parseInt(message.author.id)})
        )`);
}