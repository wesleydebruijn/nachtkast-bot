var fs = require("fs");

var commands = module.exports = {
    loadEvents: function(bot) {
        var events = fs.readdirSync('./events');
        var eventsList =  {
            voiceLeave: [],
            voiceJoin: [],
            presence: [],
            message: []
        };

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
        
        return eventsList;
    }
}
