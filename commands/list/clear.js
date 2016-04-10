"use strict";

let data = require('./../data');
let util = require('./../util');
let Constants = require('./../../constants');

var info = module.exports = {
    identifier: "clear",
    permission: Constants.Permissions.manageChannel,
    invoke: function() {
        let bot = arguments[0];
        let message = arguments[1];
        let textChannel = arguments[2][1];
        let limit = arguments[2][2];

        if(limit > 50) {
            limit = 50;
        }

        if(textChannel != null) {
            var channel = bot.channels.get("name", textChannel);
            if(channel != null) {
                if(channel.type != "voice") {
                    bot.getChannelLogs(channel, limit, {}, function(err, messages) {
                        if(err) console.log(err);
                        for(var key in messages) {
                            var msg = messages[key];
                            bot.deleteMessage(msg, function(err) {
                                if(err && process.env.DEBUG) console.log(err);
                            });
                        }
                    });

                    bot.reply(message, " cleared " + limit + " messages in " + textChannel + ". (╯°□°）╯︵ ┻━┻", { tts: false }, function(err, message) {
                        if(err && process.env.DEBUG) console.log(err);
                    });
                }
            }
        }
    }
}
