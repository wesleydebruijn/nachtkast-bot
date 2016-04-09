"use strict";

let data = require('./../data');
let util = require('./../util');

var info = module.exports = {
    identifier: "status",
    invoke: function() {
        let bot = arguments[0];
        let status = arguments[2][1];
        
        switch(status) {
            case "idle":
                bot.setStatus("idle", "", function(err) {
                    if(err) console.log("Error changing status: " + err);
                });

                process.env.STATUS = "Idle";
                break;
            case "online":
                bot.setStatus("online", "", function(err) {
                    if(err) console.log("Error changing status: " + err);
                });

                process.env.STATUS = "Online";
                break;
            default:
                break;
        }
    }
}
