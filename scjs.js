const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging");
const commands = require("./commands");
const util = require("./utilities.js");

var awoocounter = 0;
var awoochannel = null;

client.on("ready", async=> {
    logger.log("\nBOT START...\n")
    client.user.setActivity(`khelp`);
});

 client.on("message", async msg => {
    // Return if author is bot or message is not command
    if (msg.author.bot) { return; }

    if(msg.content.substring(0,4).toLocaleLowerCase() == "awoo") {
        msg.react(":awoo:494043211023777793").catch((err) => {
            logger.warn("server does not have 'awoo emote', " + err);
        })
        if (awoochannel == null) {
            awoochannel = msg.channel;
        }
        else if(msg.channel == awoochannel) {
            awoocounter++;
        }

        if (awoocounter >= 3) {
            awoochannel.send("a howl? AWOOOO!!!");
            awoocounter = 0;
            awoochannel = null;
        }
    } 
    else{ 
        if (awoocounter > 0) {
            logger.warn("awoo streak ended");
        }
        awoocounter = 0;
        awoochannel = null;
    }

    if (msg.content.toLowerCase() == "owo") {
        var rand = Math.floor(Math.random() * 4);
        switch(rand) {
            case(0): 
                msg.channel.send("whats this?");
                break;
            case(1):
                msg.channel.send("*Notices bulge*");
                break;
            case(2):
                msg.channel.send("OWOwOWO *Notices OwO*");
                break;
            default:
                msg.channel.send("UwU");
                break;
        }
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
        logger.crit(msg.author.tag +" command failed, [" + command + "]");
        logger.crit(err);
    }
});

client.login(token.token);
