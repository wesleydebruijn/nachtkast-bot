var Discord = require("discord.js");
var bot = new Discord.Client();
require('dotenv').config();

// Events
var onGameChange = require("./events/ongamechange.js");

// Commands
var util = require('./commands/util');
var data = require('./commands/data');

bot.on("ready", function() {
    setTimeout(function() {
        console.log("Nachtkast-bot started. Ready for action!");

        // Load commands
        data.init(util.loadCommands());

        // Load events
        onGameChange.init(bot);
    }, 2000);
})

bot.on("message", function(message) {
    var msg = util.format(message);
    if (util.isCommand(msg)) {
        var args = msg.split(" ");
        var cmd = data.commands[args[0].substring(1, msg.length)];
        if (cmd != null) {
            cmd.invoke(bot, message, args);
        }

        // Delete the message that invoked the command
        bot.deleteMessage(message, function(err) {
            if(err) console.log(err);
        });
    }
});

bot.on("presence", function(oldUser, user) {
    onGameChange.presence(user);
});

bot.on("voiceLeave", function(channel, user) {
    onGameChange.voiceLeave(channel, user);
});

bot.loginWithToken(process.env.TOKEN);
