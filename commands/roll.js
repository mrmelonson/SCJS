const consts = require("../constants.json");

module.exports = {
	name: 'roll',
    description: 'Rolls a dice, default 6 sides',
    syntax: `\`${consts.prefix}roll (# of sides)\``,
    aliases: ['dice'],
    clearlvl: 0,
	execute(message, args, client) {
        var num = parseInt(args[0], 10);
        if (Number.isNaN(num)) {
            message.reply(`you rolled a ${Math.floor(Math.random() * 6) + 1}`)
        }
        else {
            message.channel.send("<@" + message.member.id + ">, you rolled a " + Math.floor((Math.random() * num) + 1));
        }
        return;
    },
};