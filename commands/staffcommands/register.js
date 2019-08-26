const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const logger = require("../../logging")

module.exports = {
	name: 'register',
	description: 'Registers users to database',
	syntax: '`kregister`',
	clearlvl: 2,
	execute(message, args, client) {
	   
		message.channel.send("Registering users");

		MongoClient.connect(url, function(err, database) {
			var openDatabase = database.db('test');
			var myobj = [];

			message.guild.members.forEach(member => {
				myobj.push({id: `${member.id}`, username: `${member.user.username}`})
			});

			message.channel.send(`[${myobj.length}] users to register`);

			openDatabase.collection(message.guild.name).insertMany(myobj, function(err, res) {
				if (err) {
					message.channel.send(`Error, something went wrong :(`);
					throw err;
				}
				logger.log(`Resgistering [${res.insertedCount}] entires`);
				message.channel.send(`Done, [${res.insertedCount}] users successfully registered into database`);
				database.close();
			});


		})

    },
};