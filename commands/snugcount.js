const utilities = require("../utilities");
//const db = require("../db.json");

module.exports = {
	name: 'snugcount',
	description: 'See your/others snugcount',
    syntax: '`ksnugcount [user](optional)`',
    clearlvl: 0,
	execute(message, args, client) {
        var member = message.mentions.members.first() || message.guild.members.get(args[1]);
        var lonemessage = "";
        if (!member) {
            member = message.author;
        }

        utilities.Editdb("snuggive", "+0", member.id);
        utilities.Editdb("snugreceive", "+0", member.id);
        utilities.Editdb("lonelylvl", "+0", member.id);
        utilities.Editdb("clowncount", "+0", member.id);

        if (db[member.id]["lonelylvl"] > 0) {
            lonemessage = "\nLoneliness level: " + db[member.id]["lonelylvl"]
        }

        if (db[member.id]["clowncount"] > 0) {
            lonemessage = "\nClown Count: " + db[member.id]["clowncount"]
        }


        message.channel.send("```" +
                            "Snugs given: " + db[member.id]['snuggive'] +
                            "\nSnugs received: " + db[member.id]['snugreceive'] +
                            lonemessage +
                            "```");
        return;
    },
};