var Discord = require("discord.js");
var onGameChange = require("./events/ongamechange.js");

require('dotenv').config();

var bot = new Discord.Client();

bot.on("ready", function() {
  setTimeout(function() {
    onGameChange.init(bot);
  }, 2000);
})

bot.on("message", function(message){
    if(message.content === "ping") bot.reply(message, "pong");
});

bot.on("presence", function(oldUser, user) {
  onGameChange.presence(user);
});

bot.on("voiceLeave", function(channel, user) {
  onGameChange.voiceLeave(channel, user);
});

bot.loginWithToken(process.env.TOKEN);
