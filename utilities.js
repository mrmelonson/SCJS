const Discord = require("discord.js");

module.exports = {
    isModerator: function(member) {
        var flag = false;
        member.roles.forEach(role => {
            if (role.name == "staff") {
                flag = true
            }
            //console.log(role.name);
        });
        return flag;
    }
};