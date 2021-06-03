"use strict";
exports.__esModule = true;
exports.start = void 0;
var dotenv = require("dotenv");
var Discord = require("discord.js");
dotenv.config();
var client = new Discord.Client();
client.once("ready", function () {
    console.log("Ready!");
});
client.on("message", function (message) {
});
client.on("raw", function (e) {
    var d = e.d;
});
var start = function () {
    client.login(process.env.TOKEN);
};
exports.start = start;
//# sourceMappingURL=index.js.map