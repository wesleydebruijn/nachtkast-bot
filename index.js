var Discord = require("discord.js");
var Constants = require("./constants");
var bot = new Discord.Client();

process.env.DEBUG = true;
process.env.TOKEN = "MTY4MzQ4MDkxMDMwODMxMTA0.CeqR4A.7mS039NG2Ol0g7YBW1-_a11D2q4";
process.env.STATUS = "Online";

// Events
var eventHandler = require("./handlers/eventhandler.js");

// Commands
var commandHandler = require("./handlers/commandhandler.js");

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
