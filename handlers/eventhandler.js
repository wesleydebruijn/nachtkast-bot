var Constants = require("./../constants");
var fs = require("fs");

var eventHandler = module.exports = {
    bot: null,
    server: null,
    eventsList: null,

    init: function(client) {
        bot = client;
        eventsList = {
            voiceLeave: [],
            voiceJoin: [],
            presence: [],
            message: []
        };

        // load all events
        this.loadEvents();
        this.registerEventListeners();
    },

    loadEvents: function() {
        var events = fs.readdirSync('./events');

        if(events.length > 0) {
            events.forEach(function(evt) {
                var moduleString = evt.substring(0, evt.length - 3);
                // check which events need to be triggered
                var event = require('./../events/' + moduleString);

                for(var key in event) {
                    if(key in eventsList) {
                        eventsList[key].push(event[key]);
                    }
                }

                event.init(bot);
            });
        }
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
