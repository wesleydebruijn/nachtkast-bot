"use strict";

let data = require('./../data');
let util = require('./../util');
let Constants = require('./../../constants');

var info = module.exports = {
    identifier: "status",
    invoke: function() {
        let bot = arguments[0];
        let status = arguments[2][1];

        switch(status) {
            case Constants.Status.IDLE:
                bot.setStatus(Constants.Status.IDLE, "", function(err) {
                    if(err) console.log("Error changing status: " + err);
                });

                process.env.STATUS = Constants.Status.IDLE;
                break;
            case Constants.Status.ONLINE:
                bot.setStatus(Constants.Status.ONLINE, "", function(err) {
                    if(err) console.log("Error changing status: " + err);
                });

                process.env.STATUS = Constants.Status.ONLINE;
                break;
            default:
                break;
        }
    }
}
