# wikiwatcher #

Little bot that watches for edits to organisation related pages and alerts a Slack channel, to monitor for vandalism or incorrect content.

Powered by the [wikichanges](https://www.npmjs.com/package/wikichanges) nodejs library.

## Dokku
This repository has files that support deployment to a Dokku installation, and requires the `dokku-apt` extension.

## Usage
Push to Dokku (or run locally, installing dependencies). Set the `SLACK_API_URL` environment variable to an [Incoming Webhook](https://australiangreens.slack.com/apps/A0F7XDUAZ-incoming-webhooks) URL for Slack.

## Example
![wikichanges.png](https://bitbucket.org/repo/G58zMk/images/2217808948-wikichanges.png)

## TODO

* Move more things out of .js and into a config file and/or environment variables.
* Add option to hide bot edits