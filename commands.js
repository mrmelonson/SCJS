const Discord = require("discord.js");
const constant = require("./constants.json")
const utilities = require("./utilities.js");
const logger = require("./logging");
const nonAssignable = require("./nonassignable.json");

// If using VS code press F12 while cursor is on the function to quickly navigate to it!

var commandDictionary = {
    //user commands
    "ping" : ping,
    "info" : info,
    "assign" : assign,
    "remove" : remove,
    "roles" : roles,
    "action" :action,
    "help" : help,

    // staff commands
    "mute" : mute,
    "unmute" : unmute,
    "purge" : purge,
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
function ping(message, args) {
    var t1 = Date.now();
    message.channel.send(":ping_pong: Pong!").then((message) =>{
        var t2 = Date.now();
        message.edit(":ping_pong: Pong! Took " + (t2 - t1) + " milliseconds!");
    });
}

//
// ASSIGN COMMAND
// Assigns roles to users
//

function assign(message, args) {
    var roleName = args.join(' ');
    roleName = roleName.toLowerCase();

    if (message.guild.id == constant.AusfursID && message.channel.id != constant.AusfursChangeroles) {
        message.channel.send("Sorry, Please use this command in <#409721129515614210>.");
        return;
    }

    if(args.length == 0) {
        message.channel.send("Incorrect syntax : `kassign role`");
        logger.log(message.member.user.tag + " used kassign without args");
        return;
    }
    var flag = false;
    try {
        nonAssignable.nonAssignable.forEach(role => {
            if (roleName == role.toLowerCase()) {
                throw ('forbidden');
            }
        });
    }
    catch (err) {
        message.channel.send("Sorry, i don't have permission to assign that role to you.")
        logger.warn("Could not assign role: " + err);
        return;
    }

    message.guild.roles.forEach(role => {
        if(role.name.toLowerCase() == roleName) {
            message.member.addRole(role).then(() => {
                message.channel.send("<@" + message.member.id+ ">, I have assigned [" + role.name + "] to you.")
                logger.log("Added role [" + role.name + "] to " + message.member.user.tag);
            }).catch((err) => {
                message.channel.send("Sorry, i don't have permission to assign that role to you.")
                logger.warn("Could not assign role: " + err);
            });
            flag = true;
            return;
        }
    });
    if (!flag) {
        message.channel.send("Sorry this role does not exist or i don't have permission to assign it to you.");
        logger.warn("Role [" + roleName + "] does not exist.");
    } 
    return;
}

//
// Remove Command
// Removes roles from user
//

function remove(message, args) {
    var roleName = args.join(' ');
    roleName = roleName.toLowerCase();
    if (message.guild.id == constant.AusfursID && message.channel.id != constant.AusfursChangeroles) {
        message.channel.send("Sorry, Please use this command in <#409721129515614210>.");
        return;
    }

    if(args.length == 0) {
        message.channel.send("Incorrect syntax : `kremove role`");
        logger.log(message.member.user.tag + " used kremove without args");
        return;
    }

    try {
        nonAssignable.nonAssignable.forEach(role => {
            if (roleName == role.toLowerCase()) {
                throw ('forbidden');
            }
        });
    }
    catch (err) {
        message.channel.send("Sorry, i don't have permission to remove that role from you.")
        logger.warn("Could not assign role: " + err);
        return;
    }

    var flag = false;

    message.member.roles.forEach(role => {
        if (role.name.toLowerCase() == roleName) {
            message.member.removeRole(role).then(() => {
                message.channel.send("<@" + message.member.id+ ">, I have removed [" + role.name + "] from you.");
                logger.log("Removed role [" + role.name + "] from " + message.member.user.tag);
            }).catch((err) => {
                message.channel.send("Sorry, i don't have permission to remove that role from you.")
                logger.warn("Could not remove role: " + err);
            });
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

//
// Info command
// Gives info about the bot
//

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

//
// Help Command
// Gives help
// PLEASE ADD NEW COMMANDS HERE
//

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
    commands.push("**Roll command**\n" +
                "Syntax - `kroll [# of sides]`\n" +
                "Desc - Rolls a dice\n");

    if (utilities.isModerator(message.member)) {
        commands.push("\n**Moderator Commands**\n");
        commands.push("**Mute command**\n" +
                    "Syntax - `kmute [user]`\n" +
                    "Desc - Mutes a user\n");
        commands.push("**Unmute command**\n" +
                    "Syntax - `kumute [muted user]`\n" +
                    "Desc - Unmutes a user\n");
    }
    logger.log(message.author.tag + " Requesting help.");

    message.member.send(commands.join('')).then(() => {
            message.channel.send("<@" + message.member.id + ">, I have sent you your available commands.");
            logger.log("Success, " + message.author.tag + " has recived help.");
    }).catch(() => {
            message.channel.send("Sorry <@"+ message.member.id + "> i cannot message you. Here are your commands:\n" +
                                commands.join(''));
            logger.warn("Failed sending message to chat. Error:" + err);
    });
    
}

//
// Roll command
// Generates a random number
//

function roll(message, args) {
    var num = parseInt(args[0], 10);
    if (Number.isNaN(num)) {
        message.channel.send("<@" + message.member.id + ">, that is not a number.");
    }
    else {
        message.channel.send("<@" + message.member.id + ">, you rolled a " + Math.floor((Math.random() * num) + 1));
    }
    return;
}

//
// Rolls command
// Lists all the roles
//

function roles(message, args) {
    var roles = [];
    if (message.guild.id != constant.AusfursID){
        return;
    }

    roles.push("***ROLES!!!***\n");
    roles.push("**Nationalities**\n" +
                "Australia\n" +
                "New Zealand\n" +
                "International\n");

    roles.push("\n**States (if in AUS)**\n" +
                "QLD\n" +
                "NSW\n" +
                "ACT\n" +
                "VIC\n" +
                "TAS\n" +
                "SA\n" +
                "WA\n" +
                "NT\n");

    roles.push("\n**Sexuality**\n" +
                "Straight\n" +           
                "Gay\n" +
                "Bi\n" +
                "Asexual\n");
    
    roles.push("\n**Prefs (for Bi)**\n" +            
                "Male Preference\n" +
                "Female Preference\n");
    
    roles.push("\n**Gender**\n" +
                "Male\n" +     
                "Female\n" +             
                "Non-binary\n" +         
                "Trans\n" +       
                "Unspecified Gender\n");

    roles.push("\n**Artists Roles**\n" +
                "Artist\n" +
                "Commissions Open\n" +   
                "Commissions Closed\n");
    roles.push("\n**DM/RP Roles**\n" + 
                "DM Friendly\n" +
                "DM Unfriendly\n" +      
                "DM Request\n" +    
                "RP Friendly\n" +       
                "RP Unfriendly\n" +     
                "RP Request\n");
    
    message.member.send(roles.join('')).then(() => {
            message.channel.send("<@" + message.member.id + ">, I have sent you your available roles.");
            logger.log("Success, " + message.author.tag + " has recived help.");
    }).catch(() => {
            message.channel.send("Sorry <@"+ message.member.id + "> i cannot message you. please check the Pins");
            logger.warn("Failed sending message to chat. Error:" + err);
    });
}

//
// Action command
// Does an action in chat
//

function action(message, args) {
    var member = message.mentions.members.first() || message.guild.members.get(args[1]);
    if (!member || member == args[0]) {
        logger.log(message.author.tag +": Failed action command incorrect syntax");
        message.channel.send("Incorrect syntax, please mention user: `kaction [action] [user]`");
        return;
    }

    if(member.id == message.member.id) {
        message.channel.send("<@" + message.member.id + ">, you cannot use this command on yourself. Sorry!");
        return;
    }


    var action = args[0];
    var userId = message.member.id;
    var userId2 = member.id;
    if (action == "bap") {
        if (member.id == constant.SCID) {
            message.channel.send(">:V <@" + userId2 + "> :newspaper2: <@" + userId + ">");
        }
        else {
            message.channel.send("<@" + userId + "> :newspaper2: <@" + userId2 + ">");
        }
    }
    else if (action == "smooch") {
        if (member.id == constant.SCID) {
            message.channel.send(">///< T-Thank you, <@" + userId + ">.");
        }
        else {
            message.channel.send(":heart: <@" + userId + "> :kissing_heart: <@" + userId2 + "> :heart:");
        }
    }
    else if (action == "punch") {
        if (member.id == constant.SCID) {
            message.channel.send("no");
        }
        else {
            message.channel.send("<@" + userId + "> :right_facing_fist: :boom: <@" + userId2 + ">");
        }
    }
    else if (action == "boop") {
        if (member.id == constant.SCID) {
            message.channel.send("*receives boop*");
        }
        else {
            message.channel.send("<@" + userId + "> :point_right: <@" + userId2 + "> *Boop*.");
        }
    }
    else if (action == "snug") {
        if (member.id == constant.SCID) {
            message.channel.send("*Holds <@${usersId}> tight*");
        }
        else {
            message.channel.send("AWWW!! <@" + userId + "> and <@" + userId2 + "> are snuggling!!");
        }
    }
    else {
        message.channel.send("Sorry <@" + userId + "> that was not an action or it was misspelt...\n" +
                            "Avaliable actions:\n" +
                            "```\n" +
                            "Bap\n" +
                            "Smooch\n" +
                            "Boop\n" +
                            "Punch\n" +
                            "Snug" +
                            "```");
    }



}

/*
* 
*  STAFF COMMANDS
*
*/

//
// MUTE COMMAND
// Mutes people
//

function mute(message, args) {
    if(!(utilities.isModerator(message.member))) {
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

    if(member.id == message.member.id) {
        logger.log(message.author.tag + ": Tried to mute themselves :/");
        message.channel.send("<@" + message.member.id + ">, you cannot use this command on yourself.");
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
        message.channel.send("<@" + member.id + ">, you have been muted");
        logger.warn(message.author.tag + " has muted " + member.user.tag);
    }
    catch (err) {
        message.channel.send("I'm sorry Dave, I'm afraid I can't do that.");
        logger.warn(message.author.tag + ", failed to assign mute role to " + member.tag + ", " + err);
    }
}

//
// UNMUTE COMMAND
// Does the polar opposite of the mute command
//

function unmute(message, args) {
    if(!(utilities.isModerator(message.member))) {
        logger.warn(message.author.tag + ": non staff attempting to use unmute command");
        message.channel.send("Sorry, you do not have access to this command")
        return;
    }

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
        logger.log(message.author.tag +": Failed unmute command, did not mention user");
        message.channel.send("Incorrect syntax, please mention user: `kunmute [user]`");
        return;
    }

    if(member.id == message.member.id) {
        logger.log(message.author.tag + ": Tried to unmute themselves");
        message.channel.send("<@" + message.member.id + ">, you cannot use this command on yourself.");
        return;
    }

    try {
        var muteRole;
        member.roles.forEach(role => {
            if (role.name == "cool off") {
                muteRole = role;
            }
        });

        member.removeRole(muteRole);
        logger.warn(message.author.tag + " has unmuted " + member.user.tag);
    }
    catch (err) {
        message.channel.send("I'm sorry Dave, I'm afraid I can't do that.");
        logger.warn(message.author.tag + ", failed to assign unmute role to " + member.tag);
    }
}

//
// Purge Command
// Purges messages
//

function purge(message, args) {
    
    if (!(utilities.isModerator(message.member))) {
        logger.warn(message.author.tag + ": non staff attempting to use purge command");
        message.channel.send("Sorry, you do not have access to this command");
        return;
    }
    let num = parseInt(args[0], 10);

    if (Number.isNaN(num)) {
        message.channel.send("<@" + message.member.id + ">, please use a number. `kpurge [number of msgs]`");
        return;
    }

    if(num >= 100) {
        message.channel.send("<@" + message.member.id + ">, Sorry you cannot purge more than 100 messages in one go.");
        return;
    }
    message.channel.send("Purging " + num + " messages now!");
    num += 2;
    logger.warn(message.author.tag + ": is purging " + num + " messages");
    message.channel.fetchMessages({limit: num}).then(messages => message.channel.bulkDelete(messages));
}

exports.commandDictionary = commandDictionary;