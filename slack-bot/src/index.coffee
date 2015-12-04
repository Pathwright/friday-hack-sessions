_ = require("underscore")
Bot = require('slackbots')
utils = require("./utils")
ai = require("./ai")

settings =
  token: process.env.BOT_API_KEY
  channel: "friday-hackdays"
  name: "CoffeeTime Bot"

bot = new Bot(settings)

sayCoffeeTime = ->
  hr = utils.getCurrentHourDecimal()
  isInRange = utils.isInRange(hr)
  emoji = ai.getEmoji(hr)
  quote = ai.getQuote(hr)
  {emoji, quote}

bot.on "message", (data)->
  if data.type is "message" and data.username isnt settings.name
    incomingMessage = data.text
    if incomingMessage.indexOf("coffee") > -1
      response = sayCoffeeTime()
      bot.postMessageToChannel(settings.channel, response.quote, {icon_emoji: response.emoji})