var Constants = require('./../constants');
var voiceHelper = require('./../helpers/voicehelper.js');

var tts = module.exports = {
    identifier: "say",
    permission: Constants.Permissions.manageChannel,

    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        // get text string
        var textArray = arguments[2];
        textArray.shift();
        textString = textArray.join("%20");

        var server = bot.servers.get("id", Constants.Server.id);

        // get sender channel
        var channel = server.members.get("id", message.sender.id).voiceChannel;

        if(channel != null) {
            voiceHelper.speak(channel, textString);
        }
    }
}
