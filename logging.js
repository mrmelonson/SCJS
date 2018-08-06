var fs = require('fs');

module.exports = {
    log: function(string) {
        //var date = new Date().toTimeString + " - " + new Date().toTimeString;
        string = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " [verbose] : " + string;
        //console.log(string);
        LogFile(string);
    },
    
    warn: function(string) {
        string = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " [WARNING] : " + string;
        //console.log("\033[33;1m" + string + "\033[0m");
        LogFile(string);
    },

    crit: function(string) {
        string = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " [CRITICAL] : " + string;
        //console.log("\033[31m" + string + "\033[0m");
        LogFile(string);
    }      
};
function LogFile(string) {
    fs.appendFile('logs/' + new Date().toDateString() + '.txt', string + "\n", function (err) {
        if (err) throw err;
    });
}