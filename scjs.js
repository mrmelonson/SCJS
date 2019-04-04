const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging");
const commands = require("./commands");

client.on("ready", async=> {
    logger.log("\nBOT START...\n")
    client.user.setActivity(`Just Call~`);
});

client.on("message", async msg => {
    // Return if author is bot or message is not command
    if (msg.author.bot) { return; }
    if (msg.content.toLowerCase().indexOf(constants.prefix)) { return; }

    //format args and command
    const args = msg.content.slice(constants.prefix.length).trim().split(" ");
    const command = args.shift().toLocaleLowerCase();
    try {
        commands.commandDictionary[command](msg, args, client);
        logger.log(msg.author.tag + " used command: [" + command + "] with args: [" + args.toLocaleString() + "]");
    }
    catch (err) {
        logger.crit(msg.author.tag +" command failed, [" + command + "]");
        logger.crit(err);
    }
});

client.on("guildMemberAdd", async member => {
    member.guild.createChannel(member.displayName + "(" + member.id.toString() +")", 'text',[{
        type: 'member',
        id: member.id.toString(),
        allow:604372080
    }])
})

client.on("guildCreate", guild => {
    logger.log("I have joined a server (" + guild.name + ")");   
});
client.on("guildDelete", guild => {
    logger.warn("I have been kicked/Banned from a server (" + guild.name + ")");
});

client.login(token.token);
