const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const contants = require("./constants.json");
const logger = require("./logging")

client.on("ready", async=> {
    console.log("\n\n\n\n\n BOT STARTING...")
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async msg => {
    if (msg.toString() == "killme") {
        msg.channel.send("*same tbh*");
    }
});

client.login(token.token);


