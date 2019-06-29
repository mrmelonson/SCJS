const Discord = require("discord.js");
const constant = require("./constants.json");
const logger = require("./logging");
const db = require("./db");
const fs = require("fs");

module.exports = {
Editdb: function(key, value, memberid) {

    if(db[memberid] == null) {
        db[memberid] = {};
    }
    
    if(db[memberid][key] == null) {
        db[memberid][key] = 0;
    }

    if (value.includes('+')) {
        db[memberid][key] += parseInt(value.slice(1));
    } 
    else if (value.includes('-')) {
        db[memberid][key] -= parseInt(value.slice(1));
    }
    else {
        db[memberid][key] = value;
    }
    if (db[memberid][key] < 0) {
        db[memberid][key] = 0;
    }
    jsonString = JSON.stringify(db, null, 2);
    fs.writeFileSync('./db.json', jsonString);
    return;
},


ModLevel: function(message) {
    var clearLvl = 0;

    if (message.guild.owner == message.member) {
        clearLvl = 4;
    }

    message.member.roles.forEach(role => {
        switch(role.name.toLowerCase()) {
            case "super trusted":   //remove ASAP
                if (clearLvl < 3) {
                    clearLvl = 3;
                }
                break;
            
            case "admin":
                if (clearLvl < 3) {
                    clearLvl = 3;
                }
                break;
            
            case "moderator":
                if (clearLvl < 2) {
                    clearLvl = 2;
                }
                break;
        }
    });
    return clearLvl;
},

PromoterHelper: function(message, memberlevel, mentionedUser, mentionedlevel, promoteToLevel) {
    mentionedUser.roles.forEach( role => {
        if (role.name.toLowerCase() == "staff" || role.name.toLowerCase() == "helper" || role.name.toLowerCase() == "moderator" || role.name.toLowerCase() == "admin") {
            mentionedUser.removeRole(role);
        }
    });
    var modLevel = memberlevel;
    var previousLevel = mentionedlevel;

    var modLevesls = {
        1 : "dadmin",
        2 : "dadmin",
        3 : "dadmin"
    }
    
    /*
    if (modLevel <= promoteToLevel) {
        throw('Permission Denied');
        return;
    }
    */
    
    if (promoteToLevel < 1) {
        message.channel.send("<@" + mentionedUser.id+ ">, You have been demoted to user");
        logger.warn(mentionedUser.tag + " : has been demoted to User");
        return;
    }

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
    
    return;
    },

};

