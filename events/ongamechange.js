var Constants = require("./../constants");

var onGameChange = module.exports = {
    bot: null,
    server: null,
    waitChannel: null,

    init: function(client) {
        bot = client;

        server = bot.servers.get("id", Constants.Server.id);

        // check if waiting room exists
        waitChannel = server.channels.get("name", Constants.Server.waitChannelName);
        if (waitChannel == null) {
            // create new wait channel
            bot.createChannel(server, Constants.Server.waitChannelName, "voice", function(err, channel) {
                waitChannel = channel;

                // join wait channel
                bot.joinVoiceChannel(waitChannel);
            });
        }
        // join wait channel
        bot.joinVoiceChannel(waitChannel);
    },

    presence: function(user) {
        // if user starts playing a game
        if (user.game != null) {
            // check if user is in waiting room
            if (waitChannel.members.get("username", user.username) != null) {
                // check if game channel exists
                var channelName = Constants.Server.waitChannelPrefix + user.game.name;
                var gameChannel = server.channels.get("name", channelName);

                if (gameChannel == null) {
                    // create new game channel
                    bot.createChannel(server, channelName, "voice", function(err, channel) {
                        // move user to channel
                        bot.moveMember(user, channel);
                    });
                } else {
                    // move user to channel
                    bot.moveMember(user, gameChannel);
                }
            }
        }
    },

    voiceLeave: function(channel, user) {
        // check if game exists in created channels
        if (channel.name.charAt(0) == Constants.Server.waitChannelPrefix) {
            // check if channel is empty
            if (channel.members.length == 0) {
                // remove channel
                channel.delete();
            }
        }
    }
}
