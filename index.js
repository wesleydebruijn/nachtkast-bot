var Discord = require("discord.js");
var Constants = require("./constants");
var bot = new Discord.Client();

// Events
var onGameChange = require("./events/ongamechange.js");
var onFollow = require("./events/onfollow.js");

process.env.DEBUG = true;
process.env.TOKEN = "MTY4MzQ4MDkxMDMwODMxMTA0.CeqR4A.7mS039NG2Ol0g7YBW1-_a11D2q4";
process.env.STATUS = "Online";

// Commands
var commandHandler = require("./commands/commandhandler.js");

bot.on("ready", function() {
    setTimeout(function() {
        console.log(bot.user.username + " started. Ready for action!");

        // custom values
        bot.custom = {};

        // Load commands
        commandHandler.init(bot);

        // Load events
        onGameChange.init(bot);
        onFollow.init(bot);
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

bot.on("voiceJoin", function(channel, user) {
    onFollow.voiceJoin(channel, user);
});

bot.on("voiceLeave", function(channel, user) {
    onGameChange.voiceLeave(channel, user);
});

bot.loginWithToken(process.env.TOKEN);
