"use strict";

let data = require('./../data');
let util = require('./../util');
let Constants = require('./../../constants');

var info = module.exports = {
    identifier: "follow",
    permission: Constants.Permissions.manageChannel,
    invoke: function() {
        let bot = arguments[0];
        let message = arguments[1];

        // set event value active
        bot.custom.follow = {
            active: true,
            user: message.author
        };

        // join channel of user
        bot.joinVoiceChannel(message.author.voiceChannel);

        bot.reply(message, " I'm now following you everywhere ( ͡° ͜ʖ ͡°)", { tts: false }, function(err, message) {
            if(err && process.env.DEBUG) console.log(err);
        });
    }
}
