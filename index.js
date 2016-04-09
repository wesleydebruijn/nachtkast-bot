var Discord = require("discord.js");
var Constants = require("./constants");
var bot = new Discord.Client();
require('dotenv').config();

// Events
var onGameChange = require("./events/ongamechange.js");
// Commands
var commandHandler = require("./commands/commandhandler.js");

bot.on("ready", function() {
    setTimeout(function() {
        console.log(bot.user.username + " started. Ready for action!");

        // Load commands
        commandHandler.init(bot);

        // Load events
        onGameChange.init(bot);
    }, 2000);
})

bot.on("message", function(message) {
    commandHandler.onMessage(message);
});

bot.on("presence", function(oldUser, user) {
    if(process.env.STATUS != Constants.Status.IDLE) {
        onGameChange.presence(user);
    }
});

bot.on("voiceLeave", function(channel, user) {
    onGameChange.voiceLeave(channel, user);
});

bot.loginWithToken(process.env.TOKEN);
