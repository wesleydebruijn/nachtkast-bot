var Discord = require("discord.js");
var Constants = require("./constants");
var bot = new Discord.Client();

// Events
var eventHandler = require("./handlers/eventhandler.js");

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
        eventHandler.init(bot);
    }, 2000);
});

bot.loginWithToken(process.env.TOKEN);
