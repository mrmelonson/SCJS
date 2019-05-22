const Discord = require("discord.js");
const constant = require("./constants.json");
const logger = require("./logging");
const db = require("db");

module.exports = {
Editdb: function(key, value, member) {

    if(db[member.id] == null) {
        db[member.id] = {};
    }

    db[member.id][key] = value;
    jsonString = JSON.stringify(db, null, 2)
    fs.writeFileSync('./db.json', jsonString)
},


ModLevel: function(message, member) {
    var clearLvl = 0;
    member.roles.forEach(role => {
            if (role.name.toLowerCase() == "dadmin")
            {
                clearLvl = 3;
                return;
            }
            if (role.name.toLowerCase() == "admin")
            {
                clearLvl = 3;
                return;
            
            }
            /*
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
        */
    });
    if (message.guild.owner == member) {
        clearLvl = 4;
    }
    return clearLvl;
},

PromoterHelper: function(message, memberlevel, mentionedUser, mentionedlevel, promoteToLevel) {
    mentionedUser.roles.forEach( role => {
        if (role.name.toLowerCase() == "staff" || role.name.toLowerCase() == "helper" || role.name.toLowerCase() == "moderator" || role.name.toLowerCase() == "admin") {
            mentionedUser.removeRole(role);
        }
    });
        var modLevel = memberlevel;
        console.log(modLevel);
        var previousLevel = mentionedlevel;
        console.log(previousLevel);
        console.log(promoteToLevel);
        var modLevesls = {
            1 : "staff",
            2 : "moderator",
            3 : "admin"
        }
        // Remove for assignment branch
        var modLeveslsAusfurs = {
            1 : "helper",
            2 : "moderator",
            3 : "admin"
        }
        if (modLevel <= promoteToLevel) {
            throw('Permission Denied');
            return;
        }
        
        if (promoteToLevel < 1) {
            message.channel.send("<@" + mentionedUser.id+ ">, You have been demoted to user");
            logger.warn(mentionedUser.tag + " : has been demoted to User");
            return;
        }
        // Remove for assignment branch
        if (message.guild.id == constant.AusfursID) {
            message.guild.roles.forEach(role => {
                if(role.name.toLowerCase() == modLeveslsAusfurs[promoteToLevel]) {
                    mentionedUser.addRole(role).then(() => {
                        message.channel.send("<@" + mentionedUser.id+ ">, You have been promoted to " + role.name)
                        logger.log("Added role [" + role.name + "] to " + mentionedUser.user.tag);
                    }).catch((err) => {
                        message.channel.send("Sorry, i don't have permission to assign that role to you.")
                        logger.warn("Could not assign role: " + err);
                    });
                }
            });
        } else {
            message.guild.roles.forEach(role => {
                if(role.name.toLowerCase() == modLevesls[promoteToLevel]) {
                    mentionedUser.addRole(role).then(() => {
                        message.channel.send("<@" + mentionedUser.id+ ">, You have been promoted to " + role.name)
                        logger.log("Added role [" + role.name + "] to " + mentionedUser.user.tag);
                    }).catch((err) => {
                        message.channel.send("Sorry, i don't have permission to assign that role to you.")
                        logger.warn("Could not assign role: " + err);
                    });
                }
            });
        }
        return;
    },

};

