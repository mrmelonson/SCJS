module.exports = {
	name: 'roll',
    description: 'Rolls a dice',
    syntax: '`kroll [# of sides]`',
	execute(message, args, client) {
        var num = parseInt(args[0], 10);
        if (Number.isNaN(num)) {
            message.channel.send("<@" + message.member.id + ">, that is not a number.");
        }
        else {
            message.channel.send("<@" + message.member.id + ">, you rolled a " + Math.floor((Math.random() * num) + 1));
        }
        return;
    },
};