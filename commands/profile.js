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
            member = member;
        } else if (!member) {
            member = message.member;
        }

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("discord_test");
            var query = {id: `${member.id}`};
            
            dbo.collection(`${message.guild.id}`).findOne(query, function(err, user) {
                if (err) throw err;

                var snugreceive = 0;
                var snuggive = 0;
                var clowncount = 0;
                var lonelylvl = 0;
                var description = "This user has not set up a profile description yet!";
                if (user.snuggive) {
                    snuggive = user.snuggive;
                }

                if (user.snugreceive) {
                    snugreceive = user.snugreceive;
                }

                if (user.clowncount) {
                    clowncount = user.clowncount;
                }

                if (user.lonelylvl) {
                    lonelylvl = user.lonelylvl;
                }

                if(user.profile) {
                    description = user.desc;
                }
                /*
                message.channel.send("```" +
                                    `Username: ${member.username}\n` +
                                    `\n` +
                                    `Snugs Given: ${snuggive}\n` +
                                    `Snugs Received: ${snugreceive}\n` +
                                    `# of times clowned: ${clowncount}\n` +
                                    `Loneliness Level: ${lonelylvl}` +
                                    "```");
                */
                message.channel.send({embed : {
                    "title": "**Profile**",
                    "description": description,
                    "color": member.highestRole.color,
                    "timestamp": new Date(),
                    "thumbnail": {
                        "url": member.user.avatarURL
                    },
                    "author": {
                        "name": member.user.username,
                        "icon_url": member.user.avatarURL
                    },
                    "fields": [
                        {
                            "name": "Snugs recieved",
                            "value": `You have received ${snugreceive} snugs!`,
                            "inline": true
                        },
                        {
                            "name": "Snugs given",
                            "value": `You have given ${snuggive} snugs!`,
                            "inline": true
                        },
                        {
                            "name": "Loneliness level",
                            "value": `Your loneliness level is: ${lonelylvl}`
                        },
                        {
                            "name": "Clowned",
                            "value": `You have been clowned on ${clowncount} times!`
                        },
                    ]
                }});
                

            });
            db.close();
        });
        return;
    },
};