const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const contants = require("./constants.json");
//import "startup.js";

client.on("ready", async=> {
    console.log(`\n\n\n\n\n BOT STARTED...`);

    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async msg => {
    if (msg.toString() == "killme") {
        msg.channel.send("*same tbh*");
    }
});

client.login(token.token);


