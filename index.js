var Discord = require("discord.js");
var bot = new Discord.Client();
require('dotenv').config();

// Events
var onGameChange = require("./events/ongamechange.js");
// Commands
var commandHandler = require("./commands/commandhandler.js");

bot.on("ready", function() {
    setTimeout(function() {
        console.log("Nachtkast-bot started. Ready for action!");

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
    if(process.env.STATUS != "Idle") {
        onGameChange.presence(user);
    }
});

bot.on("voiceLeave", function(channel, user) {
    onGameChange.voiceLeave(channel, user);
});

bot.loginWithToken(process.env.TOKEN);
