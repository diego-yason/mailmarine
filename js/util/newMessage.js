"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = globalThis.db;
const cache = [];
function default_1(message) {
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
    db.query(`INSERT INTO origin_message (messageid, server_origin, author)
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
exports.default = default_1;
//# sourceMappingURL=newMessage.js.map