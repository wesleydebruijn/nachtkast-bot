var Constants = require('./../constants');

var tts = module.exports = {
    identifier: "say",
    permission: Constants.Permissions.sendMessages,
    textString: null,

    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        // get text string
        var textArray = arguments[2];
        textArray.shift();
        textString = textArray.join("%20");

        var server = bot.servers.get("id", Constants.Server.id);

        // check if waiting room exists
        var channel = server.members.get("id", message.sender.id).voiceChannel;

        console.log(channel.name);

        if(channel != null) {
            // join voice channel if not set already
            var instance = this;
            if(bot.voiceConnection == null)  {
                bot.joinVoiceChannel(channel).then(function (channel) {
                    instance.say();
                });
            } else {
                instance.say();
            }
        }
    },

    say: function() {
        var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + textString + "&tl=nl-NL&client=tw-ob";
        bot.voiceConnection.playFile(url, { volume: 0.75 }, function(error, intent) {
            if (error) console.log(error);
            intent.on("end", function() {
                bot.voiceConnection.stopPlaying();
            });
        });
    }
}
