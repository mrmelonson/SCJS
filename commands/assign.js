const logger = require("../logging");

module.exports = {
	name: 'assign',
    description: 'Assigns roles to you',
    syntax: '`kassign [role]`',
    aliases: ['a'],
    clearlvl: 0,
	execute(message, args, client) {
        var roleName = args.join(' ');
        roleName = roleName.toLowerCase();

        if(args.length == 0) {
            message.channel.send("Incorrect syntax : `kassign role`");
            logger.log(message.member.user.tag + " used kassign without args");
            return;
        }

        var flag = false;
        var alreadyassigned = false;

        message.member.roles.forEach(role => {
            if (role.name.toLowerCase() == roleName) {
                alreadyassigned = true;
            }
        });

        if (alreadyassigned) {
            message.channel.send("You seem to already have this role.");
            return;
        }

        message.guild.roles.forEach(role => {
            if(role.name.toLowerCase() == roleName) {
                message.member.addRole(role).then(() => {
                    message.channel.send("<@" + message.member.id+ ">, I have assigned [" + role.name + "] to you.");
                    logger.log("Added role [" + role.name + "] to " + message.member.user.tag);
                }).catch((err) => {
                    message.channel.send("Sorry, i don't have permission to assign that role to you.");
                    logger.crit("Could not assign role: " + err);
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
    },
};