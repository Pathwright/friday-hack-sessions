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
  next = not isInRange
    next = "next coffee time starts in #{}"
  else
    next = "ends in #{utils.getNextStartDate()}"
  {emoji, quote}

getChannelByID = (channels, id)->
  _.find channels, (c)-> c.id is id

bot.on "message", (data)->
  if data.type is "message" and data.username isnt settings.name
    console.log "message: ", data
    incomingMessage = data.text
    if incomingMessage.indexOf("coffee") > -1
      response = sayCoffeeTime()
      channel = getChannelByID(this.channels, data.channel)
      bot.postMessageToChannel(channel.name, response.quote, {icon_emoji: response.emoji})