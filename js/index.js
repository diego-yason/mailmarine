"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const Discord = require("discord.js");
const mysql = require("mysql");
const axiospkg = require("axios");
dotenv.config();
const client = new Discord.Client();
globalThis.axios = axiospkg.default({
    baseURL: "https://discord.com/api/v9",
    headers: {
        Authorization: `Bot ${process.env.TOKEN}`
    }
});
globalThis.db = mysql.createConnection({
    host: process.env.DATABASE_IP,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: "mailmarine",
    port: 33060,
    insecureAuth: true
});
const db = globalThis.db, axios = globalThis.axios;
client.once("ready", () => {
    console.log("Ready!");
});
client.on("message", (message) => {
});
client.on("raw", e => {
    const { op, d, s: seq, t: EVENT_NAME } = e;
    if (EVENT_NAME === "INTERACTION_CREATE") {
        const interaction = d;
        const reply = () => {
        };
        switch (interaction.data.name) {
            case "begin-transmission": {
                break;
            }
        }
    }
});
function default_1() {
    db.connect(err => {
        if (err) {
            throw new Error(err.message);
        }
        console.log("Connection to MySQL Server sucess.");
        client.login(process.env.TOKEN);
    });
}
exports.default = default_1;
;
//# sourceMappingURL=index.js.map