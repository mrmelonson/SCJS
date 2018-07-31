const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging")

client.on("ready", async=> {
    console.log("BOT STARTING...")
    logger.log("LOGGING TEST");
    logger.log("LOG");
    logger.warn("WARN");
    logger.crit("CRIT");

    client.user.setActivity(`killme please`);
});

 client.on("message", async msg => {
    // Return if author is bot or message is not command
    if (msg.author.bot) return;
    if (msg.content.indexOf('k')) return;

    const args = msg.content.slice(constants.prefix.length).trim().split(" ");
    const command = args.shift().toLocaleLowerCase();

    logger.log(msg.author.tag + " used command: [" + command + "] with args: [" + args.toLocaleString() + "]");
});

client.login(token.token);
