const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./.private/token.json");
const constants = require("./constants.json");
const logger = require("./logging");
//const db = require("./db");
const fs = require("fs");
const utilities = require("./utilities")

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const staffcommandFiles = fs.readdirSync('./commands/staffcommands').filter(file => file.endsWith('.js'));

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of staffcommandFiles) {
    const command = require(`./commands/staffcommands/${file}`);
    client.commands.set(command.name, command);
}


var awoocounter = 0;
var awoochannel = null;

/*
var swear = ["fuck", "shit", "cunt", "fag", "dick", "cock", "nigger", "nigga", "bitch", "Slut", "ass"];
var responceSwear = ["Swearing?!? In *MY* christain server?!",
                    "*picks up syringe* UwU, sorry swearing is punishable by death",
                    "H-Hey, p-pwease no swearwing...",
                    "No swearing nigga",
                    "Furries are legally allowed to be euthanised you know :syringe:"];
*/

var responceowo = ["whats this?",
    "*Notices bulge*",
    "OWOwOWO *Notices OwO*",
    "UwU",
    "Bitch be OwO'n"
];

/*
var zeltrigger = ["piss", "pee", "omorashi", "urine", "toilet", "urinal", "bladder"];
var canpingzel = true;
*/

client.on("ready", async =>{
    logger.log("\nBOT START...\n")
    client.user.setActivity(`khelp`);
});

client.on("message", async msg => {

    if (msg.author.bot) {
        return;
    }

    if (msg.content.substring(0, 4).toLocaleLowerCase() == "awoo") {
        if (awoochannel == null) {
            awoochannel = msg.channel;
        } else if (msg.channel == awoochannel) {
            awoocounter++;
        }

        if (awoocounter >= 3) {
            awoochannel.send("a howl? AWOOOO!!!");
            awoocounter = 0;
            awoochannel = null;
        }
    } else {
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

    /*
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
    */
    if (msg.content.toLowerCase().indexOf(constants.prefix)) {
        return;
    }
    const args = msg.content.slice(constants.prefix.length).trim().split(" ");
    const commandName = args.shift().toLocaleLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

    try {
        if (command.clearlvl <= utilities.ModLevel(msg)) {
                command.execute(msg, args, client);
        } else {
            throw "Forbidden";
        }
        logger.log(msg.author.tag + " used command: [" + command.name + "] with args: [" + args.toLocaleString() + "]");
    } catch (err) {
        if (err == "Forbidden") {
            logger.warn(msg.author.tag + " tried running forbidden command, [" + command.name + "]");
            if (utilities.ModLevel(msg) >= 1) {
                msg.reply(`Sorry you must have clearence level ${command.clearlvl} or above to run this command`);
            } else {
                msg.reply("Sorry this command can only be run by staff");
            }
        } else {
            logger.crit(msg.author.tag + " command failed, [" + command.name + "]");
            logger.crit(err);
        }
    }
});

client.on("guildCreate", guild => {
    logger.log("I have joined a server (" + guild.name + ")");
});

client.on("guildDelete", guild => {
    logger.warn("I have been kicked/Banned from a server (" + guild.name + ")");
});

client.on("guildMemberAdd", member => {
    logger.log(`User [${member.user.username}] has joined [${member.guild.name}]`);
    utilities.RegisterUser(member);
});

client.on("guildMemberRemove", member => {
    logger.log(`User [${member.user.username}] has left [${member.guild.name}]`);
    utilities.RemoveUser(member);
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