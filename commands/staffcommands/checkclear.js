const utilities = require("../../utilities");
const consts = require("../../constants.json");

module.exports = {
	name: 'clearlvl',
	description: 'Check your clearance level',
	syntax: `\`${consts.prefix}clearlevel\``,
    clearlvl: 1,
    aliases: ['clearlevel', 'clearance'],
	execute(message, args, client) {
        message.reply(`Your clearance level is: ${utilities.ModLevel(message).toString()}`);
        return;
    },
};