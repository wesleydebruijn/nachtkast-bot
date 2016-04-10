"use strict";

let data = require('./../data');
let util = require('./../util');
let Constants = require('./../../constants');

var info = module.exports = {
    identifier: "help",
    permission: Constants.Permissions.sendMessages,
    invoke: function() {
        let bot = arguments[0];
        let message = arguments[1];

        bot.sendMessage(message.channel, "Test message", { tts: false }, function(err, message) {
            if(err) console.log(err);
        });
    }
}
