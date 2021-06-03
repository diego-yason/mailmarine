import * as dotenv from "dotenv";
import * as Discord from "discord.js";
import * as mysql from "mysql";

dotenv.config();

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", (message) => {

});

client.on("raw", e => {
    const {d} = e;
});

client.login(process.env.TOKEN);