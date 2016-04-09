"use strict";

let data = require('./../data');
let util = require('./../util');

var info = module.exports = {
    identifier: "help",
    invoke: function() {
        let bot = arguments[0];
        let message = arguments[1];

        bot.sendMessage(message.channel, "Debug message", { tts: false }, function(err, message) {
            if(err) console.log(err);
        });
    }
}
