var Discord = require("discord.js");
var Constants = require("./constants");
var bot = new Discord.Client();

var eventHandler = require("./handlers/eventhandler.js");
var commandHandler = require("./handlers/commandhandler.js");

process.env.DEBUG = true;
process.env.TOKEN = "MTY4MzQ4MDkxMDMwODMxMTA0.CeqR4A.7mS039NG2Ol0g7YBW1-_a11D2q4";
process.env.STATUS = "Online";

bot.on("ready", function() {
    setTimeout(function() {
        // Initialze bot
        bot.init();

        // Initialize handlers (commands and events)
        commandHandler.init(bot);
        eventHandler.init(bot);

        // Bot ready for usage
        console.log(bot.user.username + " started. Ready for action!");
    }, 200);
});

bot.init = function() {
    // Initialize custom variable
    bot.custom = {};

    // set bot variables
    bot.setStatus(Constants.Status.ONLINE, Constants.Server.defaultGame);
}

bot.loginWithToken(process.env.TOKEN);
