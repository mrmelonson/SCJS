//const Discord = require("discord.js");
//const constant = require("./constants.json");
const logger = require("./logging");
//const db = require("./db");
//const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

module.exports = {
Editdb: function(key, value, option, member) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db('discord_test');
        var query = {"id" : `${member.id}`};
        var myobj = {};
        dbo.collection(`${member.guild.id}`).findOne(query, function(err, res) {
            if (err) throw err;
            myobj = res;

            if (myobj == null) {
                myobj = {id: `${member.id}`, username: `${member.user.username}`};
            }
    
            if (option == "inc") {
    
                if (myobj[key] == null) {
                    myobj[key] = 0;
                }
    
                if (value.includes('-')) {
                    myobj[key] -= parseInt(value.slice(1));
                }
    
                if (value.includes('+')) {
                    myobj[key] += parseInt(value.slice(1));
                }
    
                if (myobj[key] < 0) {
                    myobj[key] = 0;
                }
    
            } else if (option = "set") {
                myobj[key] = value;
            }
    
            dbo.collection(`${member.guild.id}`).updateOne(query, {$set: myobj}, {upsert:true}, function(err) {
                if (err) throw err;
            });
            db.close();
        });
    });
    return;
},

RegisterUser: function(member) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("discord_test");
        var query = {id: `${member.id}`};
        var object = {id: `${member.id}`, username: `${member.user.username}`};

        dbo.collection(`${member.guild.id}`).updateOne(query, {$set: object}, {upsert:true}, function(err) {
            if (err) throw err;
            logger.log(`Registered User [${member.user.username}]`);
        });
        db.close();
    });
    return;
},

RemoveUser: function(member) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("discord_test");
        var query = {id: `${member.id}`};

        dbo.collection(`${member.guild.id}`).removeOne(query, function(err, Res) {
            if (err) throw err;
            console.log(`Removed user [${member.user.username}] from database`);
        });
        db.close();
    });
    return;
},


ModLevel: function(message) {
    var clearLvl = 0;

    if (message.guild.owner == message.member) {
        clearLvl = 4;
    }

    if(message.member.hasPermission('ADMINISTRATOR')) {
        clearLvl = 3;
    }

    message.member.roles.forEach(role => {
        switch(role.name.toLowerCase()) {

            case "bot tester":
                if (clearLvl < 4) {
                    clearLvl = 4;
                }
                break;
            
            case "super admin":   //remove ASAP
                if (clearLvl < 4) {
                    clearLvl = 4;
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

//Make async work somehow?

SetProfileDesc: function(message, desc) {
    return new Promise((res, rej) => {
        MongoClient.connect(url, function(err, db) {
            if (err) rej(err);
            var dbo = db.db("discord_test");
            var query = {id: message.member.id};
            var user = {desc: desc};

            dbo.collection(message.guild.id).updateOne(query, {$set: user}, {upsert:true}, function(err) {
                if (err) rej(err);
                logger.log(`Changed user [${message.author.username}] desc to [${desc}]`);
                db.close();
                res(message);
            });
        });
    });
},

/*
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
    
    
    if (modLevel <= promoteToLevel) {
        throw('Permission Denied');
        return;
    }
    
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
    */

};


