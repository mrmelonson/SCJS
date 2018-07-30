
module.exports = {
    log: function(string) {
        //var date = new Date().toTimeString + " - " + new Date().toTimeString;
        console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " [verbose] : " + string);
    },
};