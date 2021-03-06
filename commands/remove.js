const logger = require("../logging");
const consts = require("../constants.json");

module.exports = {
	name: 'remove',
    description: 'Removes roles from you',
    syntax: `\`${consts.prefix}remove [role]\``,
    aliases: ['r'],
    clearlvl: 0,
	execute(message, args, client) {
        var roleName = args.join(' ');
        roleName = roleName.toLowerCase();

        if(args.length == 0) {
            throw "Invalid Syntax";
        }

        var flag = false;
        message.member.roles.forEach(role => {
            if (role.name.toLowerCase() == roleName) {
                message.member.removeRole(role).then(() => {
                    message.channel.send("<@" + message.member.id+ ">, I have removed [" + role.name + "] from you.");
                    logger.log("Removed role [" + role.name + "] from " + message.member.user.tag);
                }).catch((err) => {
                    message.channel.send("Sorry, i don't have permission to remove that role from you.")
                    logger.crit("Could not remove role: " + err);
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
    },
};