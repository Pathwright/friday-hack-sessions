_ = require("underscore")
ct = require("./utils")

emojiMap =
  ":thumbs_up:": "&#128077;"
  ":thumbs_down:": "&#128078;"
  ":happy:": "&#128515;"
  ":happy_heart:": "&#128525;"
  ":savour:": "&#x1f60b;"
  ":cool_happy:": "&#x1f60e;"

  ":sadder:": "&#128557;"
  ":sad:": "&#128546;"
  ":scream:": "&#128561;"
  ":weary:": "&#128553;"

quotes =
  coffeeTime: [
    "Ah yeah, coffee time",
    "So much coffee"
    "Get dat coffee"
    "Moar coffee"
    "#coffeetime"
  ]
  notCoffeeTime: [
    "Ugh, gotta wait"
    "Not time yet"
    "Nope"
    "#nope"
    "Not yet"
    "Be patient"
  ]

emojis =
  coffeeTime: [
    ":grinning:"
    ":heart_eyes:"
    ":yum:"
    ":sunglasses:"
  ]
  notCoffeeTime: [
    ":confounded:"
    ":sob:"
    ":scream:"
    ":anguished:",
    ":hankey:"
  ]

module.exports =

  getEmojiByCode: (code)->
    emojiMap[code]

  getRandQuote: (which)->
    quoteOps = quotes[which]
    quote = _.sample(quoteOps)
    quote

  getQuote: (hr)->
    mood = ct.getMoodScore(hr)
    inRange = ct.isInRange(hr)
    if inRange
      return @getRandQuote("coffeeTime")
    else
      return @getRandQuote("notCoffeeTime")

  getRandEmoji: (which)->
    ops = emojis[which]
    _.sample(ops)

  getEmoji: (hr)->
    mood = ct.getMoodScore(hr)
    inRange = ct.isInRange(hr)
    if inRange
      return @getRandEmoji("coffeeTime")
    else
      return @getRandEmoji("notCoffeeTime")
