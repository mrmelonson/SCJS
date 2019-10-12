const logger = require("../logging");
const contstants = require("../constants.json");
const utils = require("../utilities");
const consts = require("../constants.json");

/*
*   TODO
*   Change command so only staff can see staff commands
*/  


module.exports = {
    name: 'help',
    description: 'Get Help!',
    syntax: `\`${contstants.prefix}help\``,
    clearlvl: 0,
    execute(message, args, client) {
        const commandlists = [];
        const staffcommandlist = [];
        const {
            commands
        } = message.client;

        if (!args.length) {

            
            commands.forEach(command => {
                if (command.clearlvl == 0) {
                    commandlists.push(command.name);
                }
                else if(utils.ModLevel(message) >= command.clearlvl) {
                    staffcommandlist.push(command.name);
                }
            });


            var fields = [];

            fields.push({
                "name" : "**User Commands**",
                "value" : `\`\`\`\n${commandlists.join('\n')}\`\`\``
            });

            if(staffcommandlist.length > 0) {
                fields.push({
                    "name" : "**Staff Commands**",
                    "value" : `\`\`\`\n${staffcommandlist.join('\n')}\`\`\``
                });
            }

            fields.push({
                "name" : "***Need more help?***",
                "value" : `Run \`${contstants.prefix}help [command name]\` to get more info on the command`
            });

            message.channel.send({embed : {
                "title": "**These are your available commands**",
                "color": Math.floor(Math.random() * 16777215),
                "timestamp": new Date(),
                "fields": fields
            }});
            
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("Invalid command name");
        }

        fields = [];

        if (command.aliases) {
            fields.push({
                "name" : `Aliases:`,
                "value" : `${command.aliases.join(', ')}`
            });
        }

        if (command.clearlvl > 0) {
            fields.push({
                "name" : `Clearance Level:`,
                "value" : `${command.clearlvl}`
            });
        }

        if (command.description) {
            fields.push({
                "name" : `Description:`,
                "value" : `${command.description}`
            });
        }
        if (command.syntax) {
            fields.push({
                "name" : `Syntax:`,
                "value" : `${command.syntax}`
            });
        }

        message.channel.send({embed : {
            "title": `**${command.name}**`,
            "color": Math.floor(Math.random() * 16777215),
            "timestamp": new Date(),
            "fields": fields
        }});
        return;
    },
};