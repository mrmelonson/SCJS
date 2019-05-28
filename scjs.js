const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const constants = require("./constants.json");
const logger = require("./logging");
const commands = require("./commands");
const db = require("./db")
const fs = require("fs")
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const utilities = require("./utilities")

var awoocounter = 0;
var awoochannel = null;
var swear = ["fuck", "shit", "cunt", "fag", "dick", "cock", "nigger", "nigga", "bitch", "Slut", "ass"];
var responceSwear = ["Swearing?!? In *MY* christain server?!",
                    "*picks up syringe* UwU, sorry swearing is punishable by death",
                    "H-Hey, p-pwease no swearwing...",
                    "No swearing nigga",
                    "Furries are legally allowed to be euthanised you know :syringe:"];

var responceowo = ["whats this?",
                    "*Notices bulge*",
                    "OWOwOWO *Notices OwO*",
                    "UwU",
                    "Bitch be OwO'n"];
var zeltrigger = ["piss", "pee", "omorashi", "urine", "toilet", "urinal", "bladder"];
var canpingzel = true;

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
/*
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
*/

if (msg.content.toLowerCase().includes('owo')) {
        msg.channel.send(responceowo[Math.floor(Math.random() * 5)]);
}


if (canpingzel) {
    for (let i = 0; i < zeltrigger.length; i++) {
        if (msg.content.toLowerCase().includes(zeltrigger[i])) {
            canpingzel = false;

            setTimeout(function () {
                canpingzel = true;
                msg.channel.send("<@428938341036326912>")
            }, 300000);

        }
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
        logger.warn(msg.author.tag +" command failed, [" + command + "]");
        logger.warn(err);
    }
});

client.on("guildCreate", guild => {
    logger.log("I have joined a server (" + guild.name + ")");   
});

client.on("guildDelete", guild => {
    logger.warn("I have been kicked/Banned from a server (" + guild.name + ")");
});

/*
readline.question("",(text) => {
        var words = text.trim().split(" ");
        var channelid = words.shift().toLocaleLowerCase();
        var chan = client.channels.get(channelid);
        
        chan.send(words.join(" "));
        logger.log("User input from command line;");
        logger.log("'" + words + "' to channel '" + chan.name + "' in '" + chan.guild.name + "'");
});
*/

client.login(token.token);
