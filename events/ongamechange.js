var onGameChange = module.exports = {
    channelId: null,
    bot: null,
    server: null,
    waitChannel: null,
    channelPrefix: null,

    init: function(client) {
        bot = client;

        server = bot.servers.get("id", 129603375535751168);
        channelPrefix = "#";

        // check if waiting room exists
        waitChannel = server.channels.get("name", "The Waiting Room");
        if(waitChannel == null) {
          // create new wait channel
          bot.createChannel(server, "The Waiting Room", "voice", function(err, channel) {
            waitChannel = channel;
          });
        }
    },

    presence: function(user) {
      // if user starts playing a game
      if(user.game != null) {
          // check if user is in waiting room
          if(waitChannel.members.get("username", user.username) != null) {
            // check if game channel exists
            var channelName = channelPrefix + user.game.name;
            var gameChannel = server.channels.get("name", channelName);

            if(gameChannel == null) {
              // create new game channel
              bot.createChannel(server, channelName, "voice", function(err, channel) {
                // move user to channel
                bot.moveMember(user, channel, function(err) {
                  console.log(err);
                });
              });
            } else {
              // move user to channel
              bot.moveMember(user, gameChannel, function(err) {
                console.log(err);
              });
            }
        }
      }
    },

    voiceLeave: function(channel, user) {
      // check if game exists in created channels
      if(channel.name.charAt(0) == channelPrefix) {
        // check if channel is empty
        if(channel.members.length == 0) {
          // remove channel
          channel.delete();
        }
      }
    }
}
