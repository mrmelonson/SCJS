const logger = require("../../logging");
const consts = require("../../constants.json");

module.exports = {
	name: 'kick',
	description: 'kicks a member',
	syntax: `\`${consts.prefix}kick (reason)\``,
	clearlvl: 3,
	async execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[0]);
        
        if (member.user.id === client.user.id) {
            message.reply("OI! Fuck off!");
            return;
        }

        if(!member) {
            message.reply(`Please mention user or provide ID. Syntax:${this.syntax}`);
            return;
        }
        args.splice(0, 1);
        var reason = args.join(' ');

        await member.kick(reason).then(() => {
            var extra = "";
            if (reason) {
                extra = `, reason: ${reason}`;
            }
            member.send(`You have been kicked from the server "${message.guild.name}"` + extra).catch(() => {
                logger.warn(`I cannot message user [${member.user.tag}] reason for kick`);
            });
            logger.warn(`[${message.author.tag}] has kicked [${member.user.tag}]. Reason: [${reason}]`);
        })
        .catch(() => {
            message.reply(`Sorry i do not have permission to kick this user.`);
            logger.warn(`User [${message.author.tag}] tried to kick [${member.user.tag}], FORBIDDEN`);
        });

        return;
    },
};