const constant = require("../constants.json")

module.exports = {
	name: 'info',
    description: 'Gives Info about the bot',
    syntax: '`kinfo`',
    clearlvl: 0,
	execute(message, args, client) {
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        }
        /*
        var date = new Date(client.uptime);
        
        var hrs = date.getHours();
        var mins = date.getMinutes();
        var secs = date.getSeconds();
        var ms = date.getMilliseconds();
        var days = date.getDay();

        console.log(date.getHours());
        */

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hrs = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;



        var time = days + 'd ' + hrs + 'h ' + mins + 'm ' + (secs) + 's'; //+ (ms) + "s";
    
        message.channel.send(
            "```" +
            "   _____             __  __                                ______                    \n" +
            "  / ___/____  __  __/ /_/ /_  ___  _________              / ____/________  __________\n" +
            "  \\__ \\/ __ \\/ / / / __/ __ \\/ _ \\/ ___/ __ \\   ______   / /   / ___/ __ \\/ ___/ ___/\n" +
            " ___/ / /_/ / /_/ / /_/ / / /  __/ /  / / / /  /_____/  / /___/ /  / /_/ (__  |__  ) \n" +
            "/____/\\____/\\__,_/\\__/_/ /_/\\___/_/  /_/ /_/            \\____/_/   \\____/____/____/  " +
            "v" + constant.versionNum +
            "\n Created by: Zelenyy" +
            "\n Written in: Node JS" +
            "\n Num of servers serving: " + client.guilds.size +
            "\n Recorded ping: " + Math.round(client.ping) + "ms" +
            "\n Up-time: " + time +
            "```" +
            "Github: http://github.com/mrmelonson/SCJS"
        );
    },
};