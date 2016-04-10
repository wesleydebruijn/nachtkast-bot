var Constants = require("./../constants");
var CommandHandler = require("./../handlers/commandhandler");
var CommandsUtil = require("./../util/commands");

var onCommand = module.exports = {
    bot: null,
    init: function(client) {
        bot = client;
    },

    message: function(message) {
        var msg = CommandsUtil.format(message);
        if (CommandsUtil.isCommand(msg)) {
            CommandHandler.handleCommand(msg, message);
        }
    }
}
