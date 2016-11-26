# wikiwatcher #

Little bot that watches for edits to organisation related pages and alerts a Slack channel, to monitor for vandalism or incorrect content.

Powered by the [wikichanges](https://www.npmjs.com/package/wikichanges) nodejs library.

## Dokku
This repository has files that support deployment to a Dokku installation, and requires the `dokku-apt` extension.

## Usage
Push to Dokku, set the `SLACK_API_URL` environment variable to an [Incoming Webhook](https://australiangreens.slack.com/apps/A0F7XDUAZ-incoming-webhooks) URL for Slack.