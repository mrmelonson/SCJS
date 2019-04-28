const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging");
const commands = require("./commands");
const db = require("./db")
const fs = require("fs")

var awoocounter = 0;
var awoochannel = null;
var swear = ["fuck", "shit", "cunt", "fag", "dick", "cock", "nigger", "nigga", "bitch", "Slut", "ass"];
var responceSwear = ["Swearing?!? In *MY* christain server?!",
                    "*picks up syringe* UwU, sorry swearing is punishable by death",
                    "H-Hey, p-pwease no swearwing...",
                    "No swearing nigga",
                    "Furries are legally allowed to be euthanised you know :syringe:",]

client.on("ready", async=> {
    logger.log("\nBOT START...\n")
    client.user.setActivity(`khelp`);
});

client.on("message", async msg => {
    // Return if author is bot or message is not command
    if (msg.author.bot) { return; }

    if(msg.content.substring(0,4).toLocaleLowerCase() == "awoo") {
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

    for (var i = 0; i < swear.length; i++) {
        if (msg.content.toLowerCase().includes(swear[i])) {
            var x;
            msg.channel.send(responceSwear[Math.floor(Math.random() * 5)]);
            if(db[msg.author.id] == null) {
                db[msg.author.id] = {};
                db[msg.author.id].sin_counter = 1;
            }
            db[msg.author.id].sin_counter++;
            jsonString = JSON.stringify(db, null, 2)
            fs.writeFileSync('./db.json', jsonString)
            break;
        }
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

client.on("guildCreate", guild => {
    logger.log("I have joined a server (" + guild.name + ")");   
});
  
  client.on("guildDelete", guild => {
    logger.warn("I have been kicked/Banned from a server (" + guild.name + ")");
  });

client.login(token.token);
