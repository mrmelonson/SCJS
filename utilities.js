const Discord = require("discord.js");

module.exports = {
    isModerator: function(member) {
        var flag = false;
        member.roles.forEach(role => {
            if (role.name.toLowerCase() == "staff")
                {
                    flag = true;
                    return;
                }
                if (role.name.toLowerCase() == "boss")
                {
                    flag = true;
                    return;
                }
                if (role.name.toLowerCase() == "admin")
                {
                    flag = true;
                    return;
                }
                if (role.name.toLowerCase() == "moderator")
                {
                    flag = true;
                    return;
                }
                if (role.name.toLowerCase() == "helper")
                {
                    flag = true;
                    return;
                }
            //console.log(role.name);
        });
        return flag;
    }
};