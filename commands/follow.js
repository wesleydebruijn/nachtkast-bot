var Constants = require('./../constants');

var follow = module.exports = {
    identifier: "follow",
    permission: Constants.Permissions.manageChannel,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        // set event value active
        bot.custom.follow = {
            active: true,
            user: message.author
        };

        // join channel of user
        bot.joinVoiceChannel(message.author.voiceChannel).then(function() {
            bot.reply(message, " I'm now following you everywhere ( ͡° ͜ʖ ͡°)", { tts: false }, function(err, message) {
                if(err && process.env.DEBUG) console.log(err);
            });
        });
    }
}
