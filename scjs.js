const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging");
const commands = require("./commands");

client.on("ready", async=> {
    client.user.setActivity(`khelp`);
});

 client.on("message", async msg => {
    // Return if author is bot or message is not command
    if (msg.author.bot) { return; }
    if (msg.content.toLowerCase().indexOf(constants.prefix)) { return; }

    //format to args and command
    const args = msg.content.slice(constants.prefix.length).trim().split(" ");
    const command = args.shift().toLocaleLowerCase();

    try {
        commands.commandDictionary[command](msg, args);
        logger.log(msg.author.tag + " used command: [" + command + "] with args: [" + args.toLocaleString() + "]");
    }
    catch (err) {
        logger.crit(msg.author.tag +" used unknown command: " + command);
        logger.crit(err);
    }
});

client.login(token.token);
