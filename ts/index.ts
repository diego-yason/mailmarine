import * as dotenv from "dotenv";
import * as Discord from "discord.js";
import * as mysql from "mysql";
import { Interaction, Payload } from "../typings/payload";
import * as axiospkg from "axios";

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
    database: "MailMarine"
});

const db = globalThis.db,
      axios = globalThis.axios;

db.connect();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", (message) => {

});

client.on("raw", e => {
    const { op, d, s: seq, t: EVENT_NAME }: Payload = e;
    if (EVENT_NAME === "INTERACTION_CREATE") {
        const interaction: Interaction = d;

        const reply = () => {
            
        };

        switch (interaction.data.name) {
            case "begin-transmission": {
                break;
            }
        }
    }
});

export const start = (): void => {
    client.login(process.env.TOKEN);
};