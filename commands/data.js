"use strict";

var data = module.exports = {
    commands: null,

    /*
    * This function will load all the commands into the data structure
    *
    * @var commands The commands array created by the Util class
    */
    init: function(commands) {
        this.commands = commands;
    }
}
