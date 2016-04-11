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
                    console.log("left channel");
                    bot.joinVoiceChannel(channel).then(function() {
                        console.log("joined");
                    }).catch(function() {
                        console.log("sochtends heel veel kanker koffie");
                    });
                }
            }
        }
    }
}
