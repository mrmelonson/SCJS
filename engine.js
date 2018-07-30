const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const contants = require("./constants.json");
import "startup.js";


client.on("ready", async=> {

    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


