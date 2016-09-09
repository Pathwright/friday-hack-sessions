'use strict';

const Bot = require('messenger-bot')

const session = require("./session")
const witClient = require("./wit")

let bot = new Bot({
  token: 'EAAC0ZAcUFwG0BANm2ejZBBtpPXqsj6VZB4HUAZAnQtbfRZBqMIZBUwwpu0kzrw4ToLiByEL8jJFmQ5cpW83p04ZAt1OTb4UCZBhn7pWn2DVdTw6WqqC0f5NXvD8mWVR4P3nY9n5WyVbwDX4py7i47kwZBkCjvki5jreUA5pNfNJFEdwZDZD',
  verify: 'pathwright_bot'
})


bot.on('error', (err) => {
  console.log(err.message)
})
 
bot.on('message', (payload, reply) => {

  const shouldRespond = payload.message && !payload.message.is_echo

  if (shouldRespond) {
    let text = payload.message.text
   
    bot.getProfile(payload.sender.id, (err, profile) => {

      if (err)
        console.log("error: ", err)

      if (profile) {
        const sessionId = payload.sender.id
        session.set(sessionId, {recipient: payload.sender.id})
        witClient.runActions(sessionId, text, {}).then( (context)=> {
          //reply("I don't know what to do yet.")  
        }).catch( (err)=> {
          console.log("wit error: ", err)
        })

      } else {
        reply("A bad thing happened.")
      }

    })
  }

})

module.exports = bot
 