var Constants = require('./../constants');
var request = require('request');
var fs = require('fs');

var help = module.exports = {
    identifier: "weer",
    permission: Constants.Permissions.sendMessages,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];
        var link = __dirname + '/buienradar.gif';
        var url = "http://api.buienradar.nl/image/1.0/RadarMapNL?w=512&h=512";

        request(url, {encoding: 'binary'}, (error, response, body) => {
            bot.sendFile(message.channel, url, "buienradar.gif", (err, message) => {
                if(err) console.log(err);
            });
        });
    }
}
