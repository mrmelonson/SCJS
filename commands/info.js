const constant = require("../constants.json")

module.exports = {
	name: 'info',
    description: 'Gives Info about the bot',
    syntax: `\`${constant.prefix}info\``,
    clearlvl: 0,
	async execute(message, args, client) {
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
        /*
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hrs = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;
        */
        var s = client.uptime
        var ms = s % 1000;
        s = s / 1000;
        var days = Math.floor(s / 86400);
        s %= 86400;
        var hrs = Math.floor(s / 3600);
        s %= 3600;
        var mins = Math.floor(s / 60);
        //s %= 60;
        var secs = Math.floor(s % 60);
        /*
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        var days = (s - hrs) / 24;
        */

        var time = days + 'd ' + hrs + 'h ' + mins + 'm ' + pad(secs) + '.' + pad(ms, 3) + "s";
        /*
        message.channel.send(
            "```" +
            "   _____ ______    _______\n" +
            "  / ___// ____/   / / ___/\n" +
            "  \\__ \\/ /   __  / /\\__ \\ \n" +
            " ___/ / /___/ /_/ /___/ / \n" +
            "/____/\\____/\\____//____/  " +
            "v" + constant.versionNum +
            "\n Created by: Zelenyy" +
            "\n Written in: Node JS" +
            "\n Num of servers serving: " + client.guilds.size +
            "\n Recorded ping: " + Math.round(client.ping) + "ms" +
            "\n Up-time: " + time +
            "```" +
            "Github: http://github.com/mrmelonson/SCJS"
        );*/

        var scjs_logo = "```" +
        "   _____ ______    _______\n" +
        "  / ___// ____/   / / ___/\n" +
        "  \\__ \\/ /   __  / /\\__ \\ \n" +
        " ___/ / /___/ /_/ /___/ / \n" +
        "/____/\\____/\\____//____/  " +
        "v" + constant.versionNum +
        "```";
        
        var owner = await client.fetchApplication();

        var scjs_info = `\n **Current prefix**: ${constant.prefix}` +
        `\n **Created by:** ${owner.owner.tag}` +
        "\n **Written in**: Node JS" +
        "\n **Num of servers serving:** " + client.guilds.size +
        "\n **Recorded ping:** " + Math.round(client.ping) + "ms" +
        "\n **Up-time:** " + time +
        "\n **[Github](http://github.com/mrmelonson/SCJS)**"
        
        var colour = Math.floor(Math.random() * 16777215); 

        message.channel.send({
            "embed": {
            "description": scjs_logo,
            "color": colour,
            "timestamp": new Date(),
            "author": {
                "name": client.user.username,
                "icon_url" : client.user.avatarURL
            },
            "fields": [
                {
                    "name": "Info",
                    "value": scjs_info
                }]
            }
        });
    },
};