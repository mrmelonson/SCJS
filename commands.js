const Discord = require("discord.js");
const constant = require("./constants.json")
const utilities = require("./utilities.js");
const logger = require("./logging");

var commandDictionary = {
    "ping" : ping,
    "info" : info
};

function ping(message, args) {
    message.channel.send(":ping_pong: Pong!");
}

function mute(message, args) {
    if(!utilities.isModerator(message.member)) {
        logger.warn(message.author.tag + ": non staff attempting to use mute command");
        message.channel.send("Sorry, you do not have access to this command")
    }

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
        logger.info(message.author.tag +": Failed mute command, did not mention user");
        message.channel.send("Incorrect syntax, please mention user: `kmute [user]`");
    }

    try {
        var muteRole;
        message.guild.roles.forEach(role => {
            if (role.name == "cool off") {
                muteRole = role;
            }
        });

        member.addRole(muteRole);
        logger.warn(message.author.tag + " has muted " + member.tag);
    }
    // TO WRITE CATCH
}

function info(message, args) {
    message.channel.send(
        "```" +
        "   _____ ______ \n" +
        "  / ___// ____/ \n" +
        "  \\__ \\/ /    \n" +
        " ___/ / /__   \n" +
        "/____/\____/     " +
        "v" + constant.versionNum +
        "\n Created by: Zelenyy" +
        "\n Written in: Node JS" +
        "```" +
        "Github: http://github.com/mrmelonson/SCJS"
    );
}

exports.commandDictionary = commandDictionary;






