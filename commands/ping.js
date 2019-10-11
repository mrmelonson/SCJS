const consts = require("../constants.json");

module.exports = {
	name: 'ping',
	description: 'Pings the bot',
	syntax: `\`${consts.prefix}\``,
	clearlvl: 0,
	execute(message, args, client) {
        message.channel.send(":ping_pong: Pong! Average ping: " + Math.round(client.ping) + " miliseconds!");
    },
};