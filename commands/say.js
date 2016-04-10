var Constants = require('./../constants');

var tts = module.exports = {
    identifier: "say",
    permission: Constants.Permissions.sendMessages,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        var server = bot.servers.get("id", Constants.Server.id);

        // check if waiting room exists
        var waitChannel = server.channels.get("name", "General");
        bot.joinVoiceChannel(waitChannel).then(function (connection) {
            bot.voiceConnection.playFile("./test.mp3", function(error, intent) {
                if (error) console.log(error);
                intent.on("end", function() {
                    console.log("kanker ding");
                });
            });
        });
    }
}
