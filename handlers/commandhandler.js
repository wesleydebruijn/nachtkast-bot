var CommandsUtil = require("./../helpers/commands");
var Constants = require("./../constants");

var commandhandler = module.exports = {
    bot: null,
    commandsList: null,
    init: function(client) {
        commandsList = CommandsUtil.loadCommands();
        bot = client;
    },

    handleCommand: function(message, obj) {
        var args = message.split(" ");
        var cmd = commandsList[args[0].substring(1, message.length)];
        var userPermissions = obj.channel.permissionsOf(obj.sender);
        if (cmd != null && userPermissions.hasPermission(cmd.permission)) {
            if(process.env.STATUS != Constants.Status.IDLE || (args[0] == "/status" && process.env.STATUS == Constants.Status.IDLE)) {
                cmd.invoke(bot, obj, args);

                // Delete the message that invoked the command
                bot.deleteMessage(obj, function(err) {
                    if(err && process.env.DEBUG) console.log(err);
                });
            }
        }
    }
}
