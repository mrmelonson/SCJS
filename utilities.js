const Discord = require("discord.js");

module.exports = {
    ModLevel: function(member) {
        var clearLvl = 0;
        member.roles.forEach(role => {
                if (role.name.toLowerCase() == "boss")
                {
                    clearLvl = 3;
                    return;
                }
                if (role.name.toLowerCase() == "admin")
                {
                    clearLvl = 3;
                    return;
                }
                if (role.name.toLowerCase() == "moderator")
                {
                    clearLvl = 2;
                    return;
                }
                if (role.name.toLowerCase() == "helper")
                {
                    clearLvl = 1;
                    return;
                }
                if (role.name.toLowerCase() == "staff")
                {
                    clearLvl = 1;
                    return;
                }
            //console.log(role.name);
        });
        return clearLvl;
    }
};