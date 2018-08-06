const Discord = require("discord.js");

module.exports = {
    isModerator: function(member) {
        member.roles.forEach(role => {
            if (role.name == "staff") {
                return true;
            }
            console.log(role.name);
        });
        return false;
    }
};