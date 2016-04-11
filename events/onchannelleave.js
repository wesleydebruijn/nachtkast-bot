var Constants = require("./../constants");
var voiceHelper = require('./../helpers/voicehelper.js');

var onChannelLeave = module.exports = {
    bot: null,
    init: function(client) {
        bot = client;
    },

    voiceLeave: function(channel, user) {
        if(typeof bot !== 'undefined') {
            // check if bot is active in the channel
            if(channel.members.get("name", bot.user.username) && user.id != bot.user.id) {
                var textString = user.username + "%20left";

                voiceHelper.speak(channel, textString);
            }
        }
    }
}
