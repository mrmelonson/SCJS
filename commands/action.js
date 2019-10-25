const constant = require("../constants.json")
const logger = require("../logging");

module.exports = {
	name: 'action',
    description: 'Use an action on someone, Avaliable actions:```\nBap\nSmooch\nBoop\nPunch\nSnug\nSlap\nNom\n```',
    syntax: `\`${constant.prefix}action [action] [user]\``,
    clearlvl: 0,
    execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[1]);
        if (!member || member == args[0]) {
            throw "Invalid Syntax";
        }

        if(member.id == message.member.id) {
            message.channel.send("<@" + message.member.id + ">, you cannot use this command on yourself. Sorry!");
            return;
        }

        var action = args[0].toLocaleLowerCase();
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
        else if (action == "slap") {
            if (member.id == constant.SCID) {
                message.channel.send(">:( that was rude <@" + userId + ">!");
            }
            else {
                message.channel.send("<@" + userId + "> :hand_splayed: :boom: <@" + userId2 + "> *ouch*");
            }
        }
        else if (action == "nom") {
            if (member.id == constant.SCID) {
                message.channel.send("Nien Nom <@" + userId + ">!");
            }
            else {
                message.channel.send("<@" + userId + "> :lips: <@" + userId2 + "> *nom*");
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
                                "Snug\n" +
                                "Slap\n" +
                                "Nom\n" +
                                "```");
        }
        return;
    },
};