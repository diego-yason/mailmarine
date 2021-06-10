import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";
import axiospkg from "axios";
import * as fs from "fs";
import axiosretry from "axios-retry";

dotenv.config();

const client = new Discord.Client();

const database = await mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_IP,
    port: parseInt(process.env.DATABASE_PORT),
    database: "mailmarine"
});

const axios = axiospkg.create({
    baseURL: "https://discord.com/api/v9",
    headers: {
        Authorization: `Bot ${process.env.TOKEN}`
    }
});

axiosretry(axios, {
    retries: 3,
    retryDelay: ((retries, err): number => {
        // todo: this
        switch (err.code) {
            case "429": {
                return err.response.data.retry_after * 1000;
            }
            default: {
                return 300;
            }
        }
    })
});

globalThis.db = database;
globalThis.axios = axios;
globalThis.client = client;

globalThis.readSql = (file) => {
    return fs.readFileSync(file).toString();
};

client.once("ready", () => {
    console.log("Ready");
});

client.on("message", (message) => {
    
});

client.login(process.env.TOKEN);