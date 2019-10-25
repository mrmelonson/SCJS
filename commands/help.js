const logger = require("../logging");
const contstants = require("../constants.json");
const utils = require("../utilities");
const discord = require('discord.js');

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

            var helpEmbedMain = new discord.RichEmbed()
                .setTitle(`**These are your available commands**`)
                .setDescription(`Current prefix: \`${contstants.prefix}\``)
                .setColor(Math.floor(Math.random() * 16777215))
                .setTimestamp(new Date())
                .addField(`**User Commands**`, `\`\`\`\n${commandlists.join('\n')}\`\`\``);
                        

            if(staffcommandlist.length > 0) {
                helpEmbedMain.addField("**Staff Commands**", `\`\`\`\n${staffcommandlist.join('\n')}\`\`\``);
            }

            helpEmbedMain.addField("***Need more help?***", `Run \`${contstants.prefix}help [command name]\` to get more info on the command`);

            message.channel.send(helpEmbedMain);
            
            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("Invalid command name");
        }

        var helpEmbed = new discord.RichEmbed()
            .setTitle(`**${command.name}**`)
            .setColor(Math.floor(Math.random() * 16777215))
            .setTimestamp(new Date());

        if (command.aliases) {
            helpEmbed.addField(`Aliases:`, `${command.aliases.join(', ')}`);
        }

        if (command.clearlvl > 0) {
            helpEmbed.addField(`Clearance Level:`,  `${command.clearlvl}`);
        }

        if (command.description) {
            helpEmbed.addField(`Description:`, `${command.description}`)
        }
        if (command.syntax) {
            helpEmbed.addField(`Syntax:`, `${command.syntax}`);
        }

        message.channel.send(helpEmbed);
        return;
    },
};