var Constants = require('./../constants');

var meme = module.exports = {
    identifier: "meme",
    permission: Constants.Permissions.sendMessages,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];
        var category = arguments[2][1];

        switch(category) {
            case "csgo":
                this.csgo(bot, message);
            break;
            case "lol":
                this.lol(bot, message);
            break;
            case "twitch":
                this.twitch(bot, message);
            break;
        }
    },

    lol: function(bot, message) {
        var url = "http://vignette2.wikia.nocookie.net/leagueoflegends/images/d/d9/Rammus_Select.ogg/revision/latest?cb=20121127014815";

        this.play(url, bot);
    },

    csgo: function(bot, message) {
        var random = Math.floor(Math.random() * 170) + 1;
        var url = "http://zorkz.ovh/nafpl/soundboard/sound" + random + ".mp3";

        this.play(url, bot);
    },

    play: function(url, bot) {
        if(bot.voiceConnection) {
            bot.voiceConnection.playFile(url, { volume: 0.75 }, function(error, intent) {
                if (error) console.log(error);
                intent.on("end", function() {
                    bot.voiceConnection.stopPlaying();
                });
            });
        }
    }
}
