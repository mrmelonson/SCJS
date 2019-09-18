const logger = require("../../logging");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

module.exports = {
	name: 'setstaffchannel',
	description: 'Prints the roles and gives a reaction for each role',
	syntax: '`ksetctaffchannel [channelID]`',
	clearlvl: 3,
	execute(message, args, client) {
        var channel = message.guild.channels.get(args[0]);
        
        if(!channel) {
            channel = message.channel;
        }

        channel.send(`Setting this channel as the staff channel`);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("discord_test");
            var query = {"id" : "Staff_Channel"};
            var object = {"id" : "Staff_Channel", "channelid" : `${channel.id}`};
            
            dbo.collection(`${message.guild.id}`).updateOne(query, {$set: object}, {upsert:true}, function(err) {
                if (err) {
                    channel.send(`Something went wrong within the database`);
                    throw err;
                }

                logger.log(`Updating Staff channel in ${message.guild.name}`);

            });
            db.close();
            channel.send(`This channel is now the staff channel`);

        });

        return;
    },
};