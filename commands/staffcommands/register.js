const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const logger = require("../../logging");

module.exports = {
	name: 'register',
	description: 'Registers users to database',
	syntax: '`kregister`',
	clearlvl: 2,
	execute(message, args, client) {

		message.channel.send("Registering users");

		MongoClient.connect(url, function(err, db) {
			var dbo = db.db("discord_test");
			var query = {};
			var object = {};
			var total = 0;

			message.guild.members.forEach(member => {
				query = {id: `${member.id}`};
				object = {id: `${member.id}`, username: `${member.user.username}`};

				dbo.collection(`${message.guild.name}`).updateOne(query, {$set: object}, {upsert:true}, function(err) {
					if (err) {
						message.channel.send("Something went wrong.");
						throw err;
					}

					logger.log(`Registered User [${member.user.username}]`);

				});
				total++;
			});

			db.close();
			logger.log(`Registered [${total}] users`);
			message.channel.send(`Registered [${total}] users`);

		});
	}
};