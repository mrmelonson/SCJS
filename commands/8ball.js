const consts = require('../constants.json');
const logger = require('../logging');

module.exports = {
	name: '8ball',
	description: 'Will give you questionable advice to questions',
    syntax: `\`${consts.prefix}8ball [question]\``,
    aliases: ['ball', '8'],
	clearlvl: 0,
	execute(message, args, client) {
        
        const answers = ['Yes', 'No', 'Maybe', 'Very no', 'Hell yes', 'Ummm, sure?', 'Ask again later', 'Spaghetti'];

        var question = args.join('').trim();
        question = question.toLowerCase();

        if (args.length === 0) {
            throw "Invalid Syntax";
        }

        if (!question.endsWith('?')) {
            message.channel.send(`Sorry, this is not a valid question`);
            logger.log(message.member.user.tag + " used 8ball without valid question");
            return;
        }

        message.channel.send(answers[Math.floor(Math.random() * answers.length)]);

        return;
        
    },
};