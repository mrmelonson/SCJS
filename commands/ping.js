const consts = require("../constants.json");

module.exports = {
	name: 'ping',
	description: 'Pings the bot',
	syntax: `\`${consts.prefix}ping\``,
	clearlvl: 0,
	async execute(message, args, client) {
		var m = await message.channel.send(`:ping_pong: Pong!`);
		await m.edit(`:ping_pong: Pong! ping: ${m.createdTimestamp - message.createdTimestamp}ms, websocket: ${Math.round(client.ping)}ms`);
    },
};