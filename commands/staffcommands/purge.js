const logger = require("../../logging");
const consts = require("../../constants.json");

module.exports = {
	name: 'purge',
	description: 'Purges messages',
	syntax: `\`${consts.prefix}purge [num of msgs]\``,
	clearlvl: 3,
	execute(message, args, client) {
        let num = parseInt(args[0], 10);
    
        if (Number.isNaN(num)) {
            message.reply(`please use a number. \`${this.syntax}\``);
            return;
        }
    
        if(num > 97) {
            message.reply("Sorry you cannot purge more than 98 messages in one go.");
            return;
        }

        message.channel.send("Purging " + num + " messages now!");
        num += 2;
        logger.warn(message.author.tag + ": is purging " + num + " messages in #" + message.channel.name);
        message.channel.fetchMessages({limit: num}).then(messages => message.channel.bulkDelete(messages));
    },
};