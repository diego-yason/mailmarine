import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as mysql from "mysql2";
import axiospkg from "axios";

dotenv.config();

const client = new Discord.Client();

const database = mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_IP,
    port: parseInt(process.env.DATABASE_PORT)
});
const axios = axiospkg.defaults;

axios.baseURL = "https://discord.com/api/v9";
axios.headers = {
    Authorization: `Bot ${process.env.TOKEN}`
};

globalThis.db = database;
globalThis.promisedb = database.promise();
globalThis.axios = axios;

client.once("ready", () => {
    console.log("Ready");
});

export default function(): void {
    client.login(process.env.TOKEN);
}