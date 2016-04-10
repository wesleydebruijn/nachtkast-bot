var Constants = require("./../constants");
var EventsUtil = require("./../util/events");

var eventHandler = module.exports = {
    bot: null,
    server: null,
    eventsList: null,

    init: function(client) {
        bot = client;
        eventsList = EventsUtil.loadEvents(bot);

        // map all events to appriopriate listener
        this.registerEventListeners();
    },

    registerEventListeners : function() {
        var instance = this;
        bot.on("message", function(message) {
            instance.handleEvent("message", [message]);
        });

        bot.on("presence", function(oldUser, user) {
            instance.handleEvent("presence", [oldUser, user]);
        });

        bot.on("voiceJoin", function(channel, user) {
            instance.handleEvent("voiceJoin", [channel, user]);
        });

        bot.on("voiceLeave", function(channel, user) {
            instance.handleEvent("voiceLeave", [channel, user]);
        });
    },

    handleEvent: function() {
        var type = arguments[0];
        var args = arguments[1];

        for(var key in eventsList[type]) {
            // call every method in event list
            eventsList[type][key].apply(this,args);
        }
    }

}
