"use strict";

let fs = require("fs");
let data = require("./data");

var util = module.exports = {

    /*
    * Loads all commands into an array so it can be accessed by its identifier
    *
    * @return array of commands
    */
    loadCommands: function() {
        let commands = fs.readdirSync('./commands/list');
        let cmdArray = {};

        if(commands.length > 0) {
            commands.forEach(function(command) {
                var moduleString = command.substring(0, command.length - 3);
                commands.push(moduleString);

                var cmd = require('./list/' + moduleString);
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
