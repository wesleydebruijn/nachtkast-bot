var Constants = require('./../constants');

var help = module.exports = {
    identifier: "help",
    permission: Constants.Permissions.sendMessages,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        bot.sendMessage(message.channel, "Test message", { tts: false }, function(err, message) {
            if(err && process.env.DEBUG) console.log(err);
        });
    }
}
