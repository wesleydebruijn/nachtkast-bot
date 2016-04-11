var Constants = require("./../constants");

var onFollow = module.exports = {
    bot: null,
    server: null,

    init: function(client) {
        bot = client;

        server = bot.servers.get("id", Constants.Server.id);
    },

    voiceJoin: function(channel, user) {
        if(typeof bot !== 'undefined') {
            // check if follow command is activated
            if(bot.custom.follow != null && bot.custom.follow.active) {
                // check if user is being followed
                var follow = bot.custom.follow;
                if(follow.user.id == user.id) {
                    // leave current channel
                    bot.leaveVoiceChannel().then(function() {
                        console.log("left channel");
                        bot.joinVoiceChannel(channel, function(error, connection) {
                            // TODO: This callback is never called, so it never creates a new voiceConenction object.
                            console.log("joined");
                        });
                    });
                }
            }
        }
    }
}
