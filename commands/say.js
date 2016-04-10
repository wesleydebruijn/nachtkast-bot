var Constants = require('./../constants');

var tts = module.exports = {
    identifier: "say",
    permission: Constants.Permissions.sendMessages,
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];

        var server = bot.servers.get("id", Constants.Server.id);

        // check if waiting room exists
        var waitChannel = server.channels.get("name", "General");
        bot.joinVoiceChannel(waitChannel).then(function (channel) {
            var url = "https://r3---sn-n4v7sn7l.googlevideo.com/videoplayback?gir=yes&clen=77111233&expire=1460340481&nh=IgpwcjAxLnBhbzAzKgkxMjcuMC4wLjE&keepalive=yes&pl=32&requiressl=yes&gcr=us&mime=audio%2Fwebm&itag=251&key=yt6&ipbits=0&lmt=1449648723653890&source=youtube&mm=31&mn=sn-n4v7sn7l&upn=Y9F5Q6_gp9c&sver=3&dur=4736.901&mt=1460318776&mv=m&fexp=9406852%2C9416126%2C9416891%2C9419817%2C9420452%2C9422596%2C9423194%2C9423662%2C9425791%2C9426927%2C9427484%2C9427902%2C9428331%2C9428398%2C9429381%2C9430763%2C9432608%2C9433307%2C9433387%2C9434012&ms=au&ip=2600%3A3c01%3A%3Af03c%3A91ff%3Afe08%3A508e&id=o-AO4EyfX7RfBuP8fHf0NVsQy3woijigTKVLM_o5MNcK1m&sparams=clen%2Cdur%2Cgcr%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Crequiressl%2Csource%2Cupn%2Cexpire&initcwndbps=14073750&signature=B339783E460772E3C65548D505495D3E1E8E88EA.8D7ABA30BE4C75CA9CE9DB2F249C9845B2A486BB&ratebypass=yes&title=Dire+Straits+-+Sultans+Of+Swing%3A+The+Very+Best+Of+Dire+Straits+%28Full+Compilation%29+%5B1998%5D";
            bot.internal.voiceConnection.playFile(url, { volume: 0.75 }, function(error, intent) {
                if (error) console.log(error);
                intent.on("end", function() {
                    console.log("kanker ding");
                });
            });
        });
    }
}
