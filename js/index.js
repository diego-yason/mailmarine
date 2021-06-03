import * as dotenv from "dotenv";
import * as Discord from "discord.js";
import * as mysql from "mysql";
dotenv.config();
const client = new Discord.Client();
globalThis.db = mysql.createConnection({
    host: process.env.DATABASE_IP,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: "MailMarine"
});
const db = globalThis.db;
db.connect();
client.once("ready", () => {
    console.log("Ready!");
});
client.on("message", (message) => {
});
client.on("raw", e => {
    const { d } = e;
});
export const start = () => {
    client.login(process.env.TOKEN);
};
//# sourceMappingURL=index.js.map