var util = require('./util');
var data = require('./data');

var commandhandler = module.exports = {
    bot: null,
    init: function(client) {
        data.init(util.loadCommands());
        bot = client;
    },

    onMessage: function(message) {
        var msg = util.format(message);
        if (util.isCommand(msg)) {
            var args = msg.split(" ");
            var cmd = data.commands[args[0].substring(1, msg.length)];
            if (cmd != null) {
                if(process.env.STATUS != "Idle" || (args[0] == "/status" && process.env.STATUS == "Idle")) {
                    cmd.invoke(bot, message, args);

                    // Delete the message that invoked the command
                    bot.deleteMessage(message, function(err) {
                        if(err) console.log(err);
                    });
                }
            }
        }
    }
}
