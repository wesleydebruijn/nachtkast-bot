var fs = require("fs");

var commands = module.exports = {
    loadCommands: function() {
        var commands = fs.readdirSync('./commands');
        var cmdArray = {};

        if(commands.length > 0) {
            commands.forEach(function(command) {
                var moduleString = command.substring(0, command.length - 3);
                commands.push(moduleString);

                var cmd = require('./../commands/' + moduleString);
                if(cmd.hasOwnProperty('init')) {
                    cmd.init();
                };
                cmdArray[cmd.identifier] = cmd;
            });
        }

        return cmdArray;
    },

    /*
    * Removes line breaks and other crazy stuff from the variable
    *
    * @var val The unformatted string
    */
    format: function(val) {
        return String(val).replace(/(\r\n|\n|\r)/gm,"");
    },

    /*
    * Returns wether a sent message contains a command
    *
    * @var message The formatted message
    */
    isCommand: function(message) {
        if(message.substring(0, 1) == "/") {
            return true;
        }
        return false;
    }
}
