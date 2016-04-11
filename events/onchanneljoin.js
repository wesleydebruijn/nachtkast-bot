var Constants = require("./../constants");
var voiceHelper = require('./../helpers/voicehelper.js');

var onChannelJoin = module.exports = {
    bot: null,
    init: function(client) {
        bot = client;
    },

    voiceJoin: function(channel, user) {
        if(typeof bot !== 'undefined') {
            // check if bot is active in the channel
            if(channel.members.get("name", bot.user.username) && user.id != bot.user.id) {
                var textString = user.username + "%20joined";

                voiceHelper.speak(channel, textString);
            }
        }
    }
}
