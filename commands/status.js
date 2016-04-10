var Constants = require('./../constants');

var info = module.exports = {
    identifier: "status",
    permission: Constants.Permissions.managePermissions,
    invoke: function() {
        var bot = arguments[0];
        var status = arguments[2][1];

        switch(status) {
            case Constants.Status.IDLE:
                bot.setStatus(Constants.Status.IDLE, "", function(err) {
                    if(err && process.env.DEBUG) console.log("Error changing status: " + err);
                });

                process.env.STATUS = Constants.Status.IDLE;
                break;
            case Constants.Status.ONLINE:
                bot.setStatus(Constants.Status.ONLINE, "", function(err) {
                    if(err && process.env.DEBUG) console.log("Error changing status: " + err);
                });

                process.env.STATUS = Constants.Status.ONLINE;
                break;
            default:
                break;
        }
    }
}
