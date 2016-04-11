var Constants = require('./../constants');

var voiceHelper = module.exports = {
    textString: null,

    speak: function(channel, text) {
        textString = text;

        // join voice channel if not set already
        var instance = this;
        if(bot.voiceConnection == null)  {
            bot.joinVoiceChannel(channel).then(function (channel) {
                instance.play();
            });
        } else {
            instance.play();
        }
    },

    play: function() {
        var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + textString + "&tl=en-GB&client=tw-ob";
        bot.voiceConnection.playFile(url, { volume: 0.75 }, function(error, intent) {
            if (error) console.log(error);
            intent.on("end", function() {
                bot.voiceConnection.stopPlaying();
            });
        });
    }
}
