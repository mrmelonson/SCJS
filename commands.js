const Discord = require("discord.js");
const constant = require("./constants.json")
const utilities = require("./utilities.js");
const logger = require("./logging");

var commandDictionary = {
    "ping" : ping,
    "info" : info,
    "mute" : mute,
    "assign" : assign,
    "remove" : remove,
    "help" : help
};

function ping(message, args) {
    message.channel.send(":ping_pong: Pong!");
}

function mute(message, args) {
    if(utilities.isModerator(message.member)) {
        logger.warn(message.author.tag + ": non staff attempting to use mute command");
        message.channel.send("Sorry, you do not have access to this command")
        return;
    }

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
        logger.log(message.author.tag +": Failed mute command, did not mention user");
        message.channel.send("Incorrect syntax, please mention user: `kmute [user]`");
        return;
    }

    try {
        var muteRole;
        message.guild.roles.forEach(role => {
            if (role.name == "cool off") {
                muteRole = role;
            }
        }); 

        member.addRole(muteRole);
        logger.warn(message.author.tag + " has muted " + member.user.tag);
    }
    catch (err) {
        message.channel.send("I'm sorry Dave, I'm afraid I can't do that.");
        logger.warn(message.author.tag + ", failed to assign mute role to " + member.tag);
    }
}

function assign(message, args) {
    var roleName = args.join(' ');
    roleName = roleName.toLowerCase();

    if(args.length == 0) {
        message.channel.send("Incorrect syntax : `kassign role`");
        logger.log(message.member.user.tag + " used kassign without args");
        return;
    }
    var flag = false;
    message.guild.roles.forEach(role => {
        if(role.name == roleName) {
            try {
                message.member.addRole(role);
                message.channel.send("<@" + message.member.id+ ">, I have assigned [" + role.name + "] to you.")
                logger.log("Added role [" + role.name + "] to " + message.member.user.tag);
            }
            catch (err) {
                message.channel.send("Sorry, i don't have permission to assign that role to you.")
                logger.warn("Could not assign role: " + err);
            }
            flag = true;
            return;
        }
    });
    if (!flag) {
        message.channel.send("Sorry this role does not exist");
        logger.warn("Role [" + roleName + "] does not exist.");
    } 
    return;
}

function remove(message, args) {
    var roleName = args.join(' ');
    roleName = roleName.toLowerCase();

    if(args.length == 0) {
        message.channel.send("Incorrect syntax : `kremove role`");
        logger.log(message.member.user.tag + " used kremove without args");
        return;
    }

    var flag = false;

    message.member.roles.forEach(role => {
        if (role.name == roleName) {
            try {
                message.member.removeRole(role);
                message.channel.send("<@" + message.member.id+ ">, I have removed [" + role.name + "] from you.");
                logger.log("Removed role [" + role.name + "] from " + message.member.user.tag);
            }
            catch (err) {
                message.channel.send("Sorry, i don't have permission to remove that role from you.")
                logger.warn("Could not remove role: " + err);
            }
            flag = true;
            return;
        }
    });
    if (!flag) {
        message.channel.send("Sorry you do not have this role");
        logger.warn(message.member.user.tag + " does not have [" + roleName + "]");
    }
    return;
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

function help(message, args) {
    var commands = [];
    commands.push("**These are your available commands**\n\n")
    commands.push("**Ping command**\n" + 
                "Syntax - `kping`\n" +
                "Desc - Pings bot\n");
    commands.push("**Info command**\n" + 
                "Syntax - `kinfo`\n" +
                "Desc - Gives info about me\n");
    commands.push("**Assign command**\n" +
                "Syntax - `kassign [role]`\n" +
                "Desc - Assigns a role to you\n");
    commands.push("**Remove command**\n" +
                "Syntax - `kremove [role]`\n" +
                "Desc - Removes a role from you\n");
    logger.log(message.author.tag + " Requesting help.");
    try {
        message.member.send(commands.join(''));
        logger.log("Success, " + message.author.tag + " has recived help.")
        message.channel.send("<@" + message.member.id + ">, I have sent you your available commands.")
    } 
    catch (err) {
        message.channel.send("Sorry <@"+ message.member.id + "> i cannot message you. Here are your commands:\n" +
                            commands.join(''));
        logger.warn("Failed sending message to chat. Error:" + err);
    }
    
}



exports.commandDictionary = commandDictionary;