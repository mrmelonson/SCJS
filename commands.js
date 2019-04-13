
const Discord = require("discord.js");
const fs = require("fs");
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

/*
* 
*  ADMIN COMMANDS
*
*/


//
// RESET SERVER
// Resets the entire server
//
function resetserver(message, args, client) {
    //purges server
    message.guild.channels.forEach(channel => {
        channel.delete();
    });

    //creates channel for each user
    message.guild.members.forEach(member => {
        member.guild.createChannel(member.displayName + member.id.toString(), 'text',
        [{
            type: 'member',
            id: member.id.toString(),
            allow:604372080
        }])
        .then(function(channel) {
            var data = {
                data:[{
                    userid:member.id, channelid:channel.id
                }]
            };
            var dataJSON = JSON.stringify(data);
            fs.appendFile('serverchanneldata.json', dataJSON, function (err) {
                if (err) throw err;
            });
        })
        .catch(console.error)
    });
}

exports.commandDictionary = commandDictionary;