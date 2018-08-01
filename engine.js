const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging");
const commands = require("./commands");

client.on("ready", async=> {
    console.log("BOT STARTING...")

    // Logging tests
    logger.log("LOGGING TEST");
    logger.log("LOG");
    logger.warn("WARN");
    logger.crit("CRIT");
    logger.log("FINISHED TESTS...");

    //Set bot "game"
    client.user.setActivity(`killme please`);
});

 client.on("message", async msg => {
    // Return if author is bot or message is not command
    if (msg.author.bot) return;
    if (msg.content.indexOf('k')) return;

    //format to args and command
    const args = msg.content.slice(constants.prefix.length).trim().split(" ");
    const command = args.shift().toLocaleLowerCase();

    try {
        commands.commandDictionary[command](msg, args);
        logger.log(msg.author.tag + " used command: [" + command + "] with args: [" + args.toLocaleString() + "]");
    }
    catch (err) {
        logger.crit(msg.author.tag +" used unknown command: " + command);
    }
});

client.login(token.token);
