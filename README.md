# atomic-robo-feed-bot
Simple bot for posting Atomic Robo comic to Telegram channel

Created with Heroku platform (*free accont*) in mind, so it needs this Heroku addons to work

1. **Heroku Scheduler** It must run 'node bot.js' every hour.
2. **mLab MongoDB** Way to store already published links.

Also bot uses this enviroment variables to setup

1. **TOKEN** - token of your bot.
2. **CHANNEL** - name of channel where to post. (*With @*)
