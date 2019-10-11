const logger = require("../logging");
const utilities = require("../utilities");
const constant = require("../constants.json");

module.exports = {
	name: 'snug',
	description: 'Snug other users!',
    syntax: `\`${constant.prefix}snug [user]\``,
    clearlvl: 0,
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[1]);

        if (!member) {
            logger.log(message.author.tag +": Failed snug command incorrect syntax");
            message.channel.send(`Incorrect syntax, please mention user: \`${this.syntax}\``);
            return;s
        }

        if (member.id == constant.SCID) {
            message.channel.send(">///< T-Thank you, " + message.author.username + ".");
            utilities.Editdb("snugreceive", "+1", "inc", member);
            utilities.Editdb("snuggive", "+1", "inc",message.member);
            return;
        }

        if (member.id == message.author.id) {
            message.channel.send("You have snugged yourself, Now thats lonely! (loneliness level +1)");
            utilities.Editdb("lonelylvl", "+1", "inc",message.member);
            return;
        }

        message.channel.send("<@" + member.id + "> has been snuggled by " + message.author.username + "!");
        utilities.Editdb("snugreceive", "+1", "inc", member);
        utilities.Editdb("snuggive", "+1", "inc", message.member);
        utilities.Editdb("lonelylvl", "-1", "inc", member);
        return;
    },
};