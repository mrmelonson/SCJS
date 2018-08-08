const Discord = require("discord.js");

module.exports = {
    isModerator: function(member) {
        var flag = false;
        member.roles.forEach(role => {
            switch(role) {
                case "staff":
                    flag = true;
                    break;
                case "boss":
                    flag = true;
                    break;
                case "admin":
                    flag = true;
                    break;
                case "moderator":
                    flag = true;
                    break;
                case "Helper":
                    flag = true
                    break;
            }
            //console.log(role.name);
        });
        return flag;
    }
};