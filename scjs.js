const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging");
const commands = require("./commands");
const util = require("./utilities.js");

client.on("ready", async=> {
    logger.log("\nBOT START...\n")
    client.user.setActivity(`khelp`);
});

 client.on("message", async msg => {
    // Return if author is bot or message is not command
    if (msg.author.bot) { return; }
    if(msg.content[0].toLocaleLowerCase() == 'a' && msg.content[1].toLocaleLowerCase() == 'w' && util.CheckOs(msg.content.toLocaleLowerCase(),2)) {
        msg.react(":awoo:494043211023777793").catch((err) => {
            logger.warn("server does not have 'awoo emote', " + err);
        })

        //msg.channel.send("<:awoo:494043211023777793>");
    }
    if (msg.content.toLowerCase().indexOf(constants.prefix)) { return; }

    //format args and command
    const args = msg.content.slice(constants.prefix.length).trim().split(" ");
    const command = args.shift().toLocaleLowerCase();

    try {
        commands.commandDictionary[command](msg, args, client);
        logger.log(msg.author.tag + " used command: [" + command + "] with args: [" + args.toLocaleString() + "]");
    }
    catch (err) {
        logger.crit(msg.author.tag +" command failed");
        logger.crit(err);
    }
});

client.login(token.token);
