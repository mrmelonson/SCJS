
const Discord = require("discord.js");
const constant = require("./constants.json")
const logger = require("./logging");
const data = require("./serverchanneldata.json")

// If using VS code press F12 while cursor is on the function to quickly navigate to it!

var commandDictionary = {
    //user commands
    "ping" : ping,

    // staff commands
    "resetserver" : resetserver
};

/*
* 
*  USER COMMANDS
*
*/

//
// PING COMMAND
// Pings the bot
//
function ping(message, args, client) {
    message.channel.send(":ping_pong: Pong! Average ping: " + Math.round(client.ping) + " miliseconds!");
}

//
// RESET SERVER
// Resets the entire server
//
function resetserver(message, args, client) {
    message.guild.channels.forEach(channel => {
        channel.delete();
    });

    message.guild.members.forEach(member => {
        member.guild.createChannel(member.displayName + "(" + member.id.toString() +")", 'text',
        [{
            type: 'member',
            id: member.id.toString(),
            allow:604372080
        }]);

        message.guild.channels.forEach(channel => {
            if(channel.Name == member.displayName + "(" + member.id.toString() +")") {
                /*data.data.push({
                    userid:member.id.toString(), 
                    channelid:channel.id.toString()
                })*/
                //channel.setTopic(member.id.toString());
                console.log(channel.Name);
            }
        });
        //console.log(data.data.toString());
    });
}


exports.commandDictionary = commandDictionary;