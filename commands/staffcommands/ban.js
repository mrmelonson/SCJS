const logger = require("../../logging");
const consts = require("../../constants.json");

module.exports = {
	name: 'ban',
	description: 'Bans a member',
	syntax: `\`${consts.prefix}ban [user/ID] (days of msgs to purge) (reason)\``,
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

        let num = parseInt(args[1], 10);
        var opts = {};

        if (!Number.isNaN(num)) {
            opts.days = num;
            args.splice(0, 2);
        } else {
            args.splice(0, 1);
        }

        opts.reason = args.join(' ');

        await member.ban(opts).then(() => {
            message.reply(`${member.user.tag} has been banned from the server`).then((msg) => {
                message.delete(5000);
                msg.delete(5000);
            });
            var extra = "";
            if (opts.reason) {
                extra = `, reason: ${opts.reason}`;
            }
            member.send(`You have been banned from the server "${message.guild.name}"` + extra).catch(() => {
                logger.warn(`I cannot message user [${member.user.tag}] reason for ban`);
            });
            logger.warn(`[${message.author.tag}] has banned [${member.user.tag}]. Reason: [${opts.reason}] Messages purged (days): [${opts.days}]`);
        })
        .catch(() => {
            message.reply(`Sorry i do not have permission to ban this user.`);
            logger.warn(`User [${message.author.tag}] tried to ban [${member.user.tag}], FORBIDDEN`);
        });

        return;
    },
};