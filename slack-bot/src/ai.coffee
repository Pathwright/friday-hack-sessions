_ = require("underscore")
ct = require("./utils")

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

  getRandQuote: (which)->
    quoteOps = quotes[which]
    quote = _.sample(quoteOps)
    quote

  getQuote: (hr)->
    if ct.isInRange(hr)
      return @getRandQuote("coffeeTime")
    else
      return @getRandQuote("notCoffeeTime")

  getRandEmoji: (which)->
    ops = emojis[which]
    _.sample(ops)

  getEmoji: (hr)->
    if ct.isInRange(hr)
      return @getRandEmoji("coffeeTime")
    else
      return @getRandEmoji("notCoffeeTime")
