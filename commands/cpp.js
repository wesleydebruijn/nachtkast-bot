var Constants = require('./../constants');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var help = module.exports = {
    identifier: "cpp",
    permission: Constants.Permissions.sendMessages,
    keywords: [],
    init: function() {
        fs.readFile('./resources/cpp_reference.json', 'utf8', (err, data) => {
            this.keywords = JSON.parse(data);
        });
    },
    invoke: function() {
        var bot = arguments[0];
        var message = arguments[1];
        var keyword = arguments[2][1];
        var specified = arguments[2][2];
        var reply = "";
        var haystack = this.search(keyword);

        if(haystack.length == 0) {
            reply = "no matches found.";
        } else if(haystack.length > 1) {
            if(typeof(specified) != 'undefined') {
                var selected = null;
                haystack.map((reference) => {
                    if(reference.category.indexOf(specified) > 0) {
                        selected = reference;
                    }
                });
                this.sendMessage(message, selected);
            } else {
                reply = "did you mean any of these? " + haystack.map((hay) => {
                    return " " + hay.name + "(" + hay.category + ")";
                });
            }
        } else {
            this.sendMessage(message, haystack[0]);
        }

        if(reply.length > 0) {
            bot.reply(message, reply, { tts: false }, (err, message) => {
                if(err) console.log(err);
            });
        }
    },

    search: function(keyword) {
        var haystack = [];

        // Search in name
        this.keywords.map(function(reference) {
            if(reference.name.indexOf(keyword) > 0 || reference.name == keyword) {
                haystack.push(reference);
            }
        });

        // If no results in name, search in description
        if(!haystack.length > 0) {
            this.keywords.map(function(reference) {
                if(reference.description.indexOf(keyword) > 0) {
                    haystack.push(reference);
                }
            });
        };

        return haystack;
    },

    fetchSnippet: function(url, cb) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                $ = cheerio.load(body);
                var snippet = $('.prettyprint').text();

                // If there is no code example, use the definition
                if(!snippet.length > 0) {
                    snippet = $('.syntax-box').text();
                }
                cb(null, snippet);
            } else {
                cb(error, null);
            }
        });
    },

    sendMessage: function(message, reference) {
        this.fetchSnippet(reference.url, function(err, snippet) {
            bot.reply(message, "```" + snippet + "```" + "\n" + reference.url, { tts: false }, (err, message) => {
                if(err) console.log(err);
            });
        });
    }
}
