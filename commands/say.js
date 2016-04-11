var Constants = require('./../constants');

var tts = module.exports = {
    identifier: "say",
    permission: Constants.Permissions.sendMessages,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        var server = bot.servers.get("id", Constants.Server.id);

        // check if waiting room exists
        var channel = server.members.get("id", message.sender.id).voiceChannel;

        console.log(channel.name);

        if(channel != null) {
            // join voice channel if not set already
            var instance = this;
            console.log(bot.voiceConnection);
            if(bot.voiceConnection == null)  {
                console.log("No voiceConnection object");
                console.log(channel.name);
                bot.joinVoiceChannel(channel).then(function (channel) {
                    instance.say();
                });

            } else {
                console.log("A voiceConnection object");
                instance.say();
            }
        }
    },

    say: function() {
        var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=Dit%20is%20een%20test&tl=nl-NL&client=tw-ob";
        bot.voiceConnection.playFile(url, { volume: 0.75 }, function(error, intent) {
            console.log(intent);
            if (error) console.log(error);
            intent.on("end", function() {
                bot.voiceConnection.stopPlaying();
            });
        });
    }
}
