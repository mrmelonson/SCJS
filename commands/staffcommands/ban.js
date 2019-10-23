const logger = require("../../logging");
const consts = require("../../constants.json");

module.exports = {
	name: 'ban',
	description: 'Bans a member',
	syntax: `\`${consts.prefix}ban [user/ID] [days of msgs to purge] [reason]\``,
	clearlvl: 3,
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[0]);
        
        if (member.user.id === client.user.id) {
            message.reply("OI! Fuck off!");
            return;
        }

        if(!member) {
            message.reply(`Please mention user or provide ID. Syntax:${this.syntax}`);
            return;
        }

        let num = parseInt(args[1], 10);
        var opts = {};

        if (!Number.isNaN(num)) {
            opts.days = num;
            args.splice(0, 2);
        } else {
            args.splice(0, 1);
        }
        opts.reason = args.join(' ');

        member.ban(opts);
        logger.warn(`[${message.author.tag}] has banned [${member.user.tag}]. Reason: [${opts.reason}] Messages purged (days): [${opts.days}]`);
    },
};