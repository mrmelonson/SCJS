const logger = require("../logging");
const utilities = require("../utilities");
const constant = require("../constants.json");

module.exports = {
	name: 'clown',
	description: 'clown people',
    syntax: `\`${constant.prefix}clown [user]\``,
    clearlvl: 0,
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!member) {
            throw "Invalid Syntax";
        }

        if (member.id == constant.SCID) {
            message.channel.send("Oh god dont't drag me into this.");
            return;
        }

        if (member.id == message.author.id) {
            message.channel.send("You have clowned yourself, Congrats");
            utilities.Editdb("lonelylvl", "+1", "inc", message.member);
            return;
        }

        message.channel.send(":clown: <@" + member.id + "> just got clown'd on lmao :clown:");
        utilities.Editdb("clowncount", "+1" , "inc", member);
        utilities.Editdb("clowncount", "-1", "inc", message.member);
        return;
    },
};