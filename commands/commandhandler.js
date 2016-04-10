var util = require('./util');
var data = require('./data');
var Constants = require("./../constants");

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
            var userPermissions = message.channel.permissionsOf(message.sender);
            if (cmd != null && userPermissions.hasPermission(cmd.permission)) {
                if(process.env.STATUS != Constants.Status.IDLE || (args[0] == "/status" && process.env.STATUS == Constants.Status.IDLE)) {
                    cmd.invoke(bot, message, args);

                    // Delete the message that invoked the command
                    bot.deleteMessage(message, function(err) {
                        if(err && process.env.DEBUG) console.log(err);
                    });
                }
            }
        }
    }
}
