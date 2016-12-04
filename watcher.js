var wikichanges = require("wikichanges");
var Slack = require('node-slack');
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

var pages = ["Australian Greens", "Richard Di Natale", "Larissa Waters", "Scott Ludlam", "Adam Bandt", "Rachel Siewert", "Sarah Hanson-Young", "Lee Rhiannon", "Peter Whish-Wilson", "Janet Rice", "Nick McKim", "Robert Simms (politician)", "Jan Barham", "Jeremy Buckingham", "Mehreen Faruqi", "David Shoebridge", "Jenny Leong", "Jamie Parker (politician)", "Tamara Smith", "Greg Barber", "Samantha Dunn", "Colleen Hartland", "Sue Pennicuik", "Nina Springle", "Sam Hibbins", "Ellen Sandell", "Andrea Dawkins", "Cassy O'Connor", "Rosalie Woodruff", "Tammy Franks", "Mark Parnell", "Robin Chapple", "Lynn MacLaren", "Shane Rattenbury", "Greens New South Wales", "Australian Greens Victoria", "Queensland Greens", "Greens Western Australia", "Greens South Australia", "Tasmanian Greens", "ACT Greens", "Northern Territory Greens", "Australian Greens Front Bench"];

var slack = new Slack(process.env.SLACK_API_URL);

var w = new wikichanges.WikiChanges({wikipedias: ["#en.wikipedia"], ircNickname: 'a-wiki-watcher'});
w.listen(function(change) {
  if (inArray(change.page, pages)) {
    slack.send({
    text: change.user + ": " + change.comment + " - " + change.url,
    channel: '#mediamonitoring',
    username: 'Wikipedia Edits'
    });
  }
});
