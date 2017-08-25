var pokemon = require("pokemon-random-name")();
var config = require("config");
var wikichanges = require("wikichanges");
var Slack = require('slack-node');
var slack = new Slack();
if (process.env.SLACK_API_URL) {
    slack.setWebhook(process.env.SLACK_API_URL);
} else {
    throw Error("SLACK_API_URL not defined.");
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}
var pages = config.get('pages');

var w = new wikichanges.WikiChanges({
    wikipedias: ["#en.wikipedia"],
    ircNickname: 'observant-' + pokemon
});
w.listen(function(change) {
    if (inArray(change.page, pages)) {
        if (change.robot) { //Trust the robots, they mean us no harm
            var alert = '#39b54a';
        } else if (!(change.anonymous)) { //Logged in users less likely to vandalise
            var alert = '#0093b3';
        } else {
            var alert = '#f26e20';
        }
        var message = [{
            "fallback": change.user + ': ' + change.comment + ' - ' + change.url,
            "color": alert,
            "author_name": change.user,
            "author_link": change.user_url,
            "title": change.page,
            "title_link": change.url,
            "text": change.comment,
            "fields": [{
                "title": "Delta",
                "value": change.delta,
                "short": false
            }, {
                "title": "Robot",
                "value": change.robot.toString(),
                "short": true
            }, {
                "title": "Anonymous",
                "value": change.anonymous.toString(),
                "short": true
            }],
            "footer": "WikiChanges",
            "ts": Math.floor(new Date() / 1000)
        }]
        slack.webhook({
            attachments: message,
            channel: config.get('channel'),
            username: config.get('username'),
        }, function(err, response) {
            console.log(response);
        });
    }
});
