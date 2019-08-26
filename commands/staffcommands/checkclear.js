const utilities = require("../../utilities");

module.exports = {
	name: 'clearlvl',
	description: 'Check Your clearance',
	syntax: '`kclearlevel`',
    clearlvl: 1,
    aliases: ['clearlevel', 'clearance'],
	execute(message, args, client) {
        message.reply(`Your clearance level is: ${utilities.ModLevel(message).toString()}`);
        return;
    },
};