const logger = require("../logging");
const contstants = require("../constants.json");
const utils = require("../utilities");

/*
*   TODO
*   Change command so only staff can see staff commands
*/ 


module.exports = {
    name: 'help',
    description: 'Get Help!',
    syntax: '`khelp`',
    clearlvl: 0,
    execute(message, args, client) {
        const commandlists = [];
        const staffcommandlist = [];
        const {
            commands
        } = message.client;

        if (!args.length) {

            //commandlists.push("**These are your available commands**\n");
            
            commands.forEach(command => {
                if (command.clearlvl == 0) {
                    commandlists.push(command.name);
                }
                else if(utils.ModLevel(message) >= command.clearlvl) {
                    staffcommandlist.push(command.name);
                }
            });

            //commandlists.push(commands.map(command => command.name).join("\n"));
            //commandlists.push(`\n\nRun \`${contstants.prefix}help [command name]\` to get more info`);

            message.reply("Here are your commands:\n" +
            "**These are your available commands**\n" + 
            commandlists.join('\n') +
            "\n\n**Staff commands:**\n" + 
            staffcommandlist.join('\n') + 
            `\n\nRun \`${contstants.prefix}help [command name]\` to get more info`);

            /*
            message.author.send(commandlists.join('')).then(() => {
                if (message.channel.type != 'dm') {
                    message.reply("I have sent you your available commands.");
                }
                logger.log("Success, " + message.author.tag + " has recived help.");
            }).catch((err) => {
                message.reply("I cannot message you. Here are your commands:\n" +
                    commandlists.join(''));
                logger.warn("Failed sending message to chat. Error:" + err);
            });
            */
            
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("Invalid command name");
        }

        commandlists.push(`**Name:** ${command.name}`);

        if (command.aliases) commandlists.push(`**Aliases: ** ${command.aliases.join(', ')}`);
        if (command.clearlvl > 0) commandlists.push(`**Clearance Level: ** ${command.clearlvl}`);
        if (command.description) commandlists.push(`**Description: ** ${command.description}`);
        if (command.syntax) commandlists.push(`**Syntax: ** ${command.syntax}`);

        message.channel.send(commandlists, {
            split: true
        });
        return;
    },
};