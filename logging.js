var fs = require('fs');

module.exports = {
    log: function(string) {
        //var date = new Date().toTimeString + " - " + new Date().toTimeString;
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000* '+9'));
        string = nd.toISOString().replace(/T/, ' ').replace(/\..+/, '') + " [verbose] : " + string;
        console.log(string);
        LogFile(string);
    },
    
    warn: function(string) {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000* '+9'));
        string = nd.toISOString().replace(/T/, ' ').replace(/\..+/, '') + " [WARNING] : " + string;
        console.log("\033[33;1m" + string + "\033[0m");
        LogFile(string);
    },

    crit: function(string) {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000* '+9'));
        string = nd.toISOString().replace(/T/, ' ').replace(/\..+/, '') + " [CRITICAL] : " + string;
        console.log("\033[31m" + string + "\033[0m");
        LogFile(string);
    }      
};
function LogFile(string) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000* '+9'));
    fs.appendFile('logs/' + nd.toLocaleDateString() + '.txt', string + "\n", function (err) {
        if (err) throw err;
    });
}