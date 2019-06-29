const logger = require("../../logging");

module.exports = {
	name: 'purge',
	description: 'Purges messages',
	syntax: '`kpurge [num of msgs]`',
	clearlvl: 3,
	execute(message, args, client) {
        let num = parseInt(args[0], 10);
    
        if (Number.isNaN(num)) {
            message.reply("please use a number. `kpurge [number of msgs]`");
            return;
        }
    
        if(num >= 97) {
            message.reply("Sorry you cannot purge more than 99 messages in one go.");
            return;
        }

        message.channel.send("Purging " + num + " messages now!");
        num += 2;
        logger.warn(message.author.tag + ": is purging " + num + " messages in #" + message.channel.name);
        message.channel.fetchMessages({limit: num}).then(messages => message.channel.bulkDelete(messages));
    },
};