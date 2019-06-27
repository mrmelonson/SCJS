const logger = require("../logging");
const utilities = require("../utilities");
const constant = require("../constants.json");

module.exports = {
	name: 'ping',
	description: 'Pings the bot',
	syntax: '`kping`',
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[1]);

        if (!member) {
            logger.log(message.author.tag +": Failed snug command incorrect syntax");
            message.channel.send("Incorrect syntax, please mention user: `kclown [user]`");
            return;
        }

        if (member.id == constant.SCID) {
            message.channel.send("Oh god dont't drag me into this.");
            return;
        }

        if (member.id == message.author.id) {
            message.channel.send("You have clowned yourself, Congrats");
            utilities.Editdb("lonelylvl", "+1", message.author.id);
            return;
        }

        message.channel.send(":clown: <@" + member.id + "> just got clown'd on lmao :clown:");
        utilities.Editdb("clowncount", "+1", member.id);
        utilities.Editdb("clowncount", "-1", message.author.id);
        return;
    },
};