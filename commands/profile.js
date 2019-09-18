const utilities = require("../utilities");
//const db = require("../db.json");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

module.exports = {
	name: 'profile',
	description: 'See your/others profile',
    syntax: '`kproflie [user](optional)`',
    aliases: ['prof'],
    clearlvl: 0,
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[1]);
        if (member) {
            member = member.user;
        } else if (!member) {
            member = message.author;
        }

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("discord_test");
            var query = {id: `${member.id}`};
            
            dbo.collection(`${message.guild.id}`).findOne(query, function(err, object) {
                if (err) throw err;

                var snugreceive = 0;
                var snuggive = 0;
                var clowncount = 0;
                var lonelylvl = 0;

                if (object.snuggive) {
                    snuggive = object.snuggive;
                }

                if (object.snugreceive) {
                    snugreceive = object.snugreceive
                }

                if (object.clowncount) {
                    clowncount = object.clowncount;
                }

                if (object.lonelylvl) {
                    lonelylvl = object.lonelylvl;
                }

                message.channel.send("```" +
                                    `Username: ${member.username}\n` +
                                    `\n` +
                                    `Snugs Given: ${snuggive}\n` +
                                    `Snugs Received: ${snugreceive}\n` +
                                    `# of times clowned: ${clowncount}\n` +
                                    `Loneliness Level: ${lonelylvl}` +
                                    "```");

            });
            db.close();
        });
        return;
    },
};