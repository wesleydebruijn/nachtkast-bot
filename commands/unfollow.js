var Constants = require('./../constants');

var info = module.exports = {
    identifier: "unfollow",
    permission: Constants.Permissions.manageChannel,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        // set event value active
        bot.custom.follow = {
            active: false,
            user: null
        };

        bot.reply(message, " I will leave you alone ༼◕_◕༽", { tts: false }, function(err, message) {
            if(err && process.env.DEBUG) console.log(err);
        });
    }
}
