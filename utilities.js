const Discord = require("discord.js");

module.exports = {
    isModerator: function(member) {
        var flag = false;
        member.roles.forEach(role => {
            if (role.name == "staff")
                {
                    flag = true;
                    return;
                }
                if (role.name == "boss")
                {
                    flag = true;
                    return;
                }
                if (role.name == "admin")
                {
                    flag = true;
                    return;
                }
                if (role.name == "moderator")
                {
                    flag = true;
                    return;
                }
                if (role.name == "helper")
                {
                    flag = true;
                    return;
                }
            //console.log(role.name);
        });
        return flag;
    }
};