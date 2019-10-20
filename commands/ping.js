const consts = require("../constants.json");

module.exports = {
	name: 'ping',
	description: 'Pings the bot',
	syntax: `\`${consts.prefix}ping\``,
	clearlvl: 0,
	execute(message, args, client) {
		var m = message.channel.send(`:ping_pong: Pong!`).then(msg => {
			msg.edit(`:ping_pong: Pong! ping: ${msg.createdTimestamp - message.createdTimestamp}ms, websocket: ${Math.round(client.ping)}ms`)
		});
    },
};