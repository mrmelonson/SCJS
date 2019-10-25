const utilities = require("../utilities");
//const db = require("../db.json");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const consts = require("../constants.json");

module.exports = {
	name: 'profileedit',
	description: 'Edit your profile! Will add more functionality later on, for now only:\n```\ndesc: set your profile description (255 char max)\n```',
    syntax: `\`${consts.prefix}profileedit [opt] [parameter]\``,
    aliases: ['profedit', 'editprof', 'editprofile'],
    clearlvl: 0,
	async execute(message, args, client) {
        var member = message.member;

        if (!args[0]) {
            throw "Invalid Syntax";
        }

        var description = args.splice(0, 1);
        description = args.join(' ').trim();

        if (description.length > 256) {
            message.reply(`Description length too long! (${description.length}/255)`);
            return;
        }
        
        var m = await message.reply('Setting profile description');
        await utilities.SetProfileDesc(message, description);
        await m.edit(`<@${message.member.id}>, Profile description set!`);
        
        return;

    },
};

