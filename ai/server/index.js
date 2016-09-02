'use strict';

const http = require('http')
const Bot = require('messenger-bot')
 
const accessToken = "G6W3F2PYLT2WA5HDNE6IB4QETNAXCOBY"
const Wit = require('node-wit').Wit
let sessions = {}



const actions = {
  getGrade(request) {
    const {sessionId, context, entities} = request
    const { intent } = entities
    
    const className = entities.className && entities.className[0].value

    // check for facebook connection

    // check for school

    // check for class in context
    if (!className) {
      // API calls
      return Promise.resolve({missing_class: true})
    } else {
      // API calls
      return Promise.resolve({ class: className, grade: "F+" })  
    }
    
  },

  getNextStep(request) {
    return Promise.resolve({ next_step_name: "To-Do: Finish everything", next_step_due: "Yesterday" })
  },

  send(request, response) {
    const {sessionId, context, entities} = request
    const {text, quickreplies} = response

    return new Promise(function(resolve, reject) {
      console.log('sending...', JSON.stringify(response), context)
      let session = sessions["foobar"]
      console.log('session...', JSON.stringify(session))
      bot.sendMessage(session.recipient, response, (err)=> {
        console.log("bot sent a message: ", err)
      })
      
      
      return resolve()
    })
  },
}

const witClient = new Wit({accessToken, actions})

let bot = new Bot({
  token: 'EAARfP56AN6EBADDumwJiiFUV3QEWb80jc8pS770ZB5iV6BViI87cEJNgb2hFuGze0uy3QDbsDScH3uIl2uCL8axvzt8OeiBeCbE7bD88BrfOl1rXvE46L82jUWcvIyKT9BMKsQ2ex1fokYfgGfjdU9C6XEe3N9ws2gMOZCfgZDZD',
  verify: 'pathwright_bot'
})



// Wit stuff




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
        const sessionId = "foobar"
        sessions[sessionId] = {}
        sessions[sessionId].recipient = payload.sender.id

        witClient.runActions(sessionId,text,{}).then( (context)=> {
          console.log("got data from wit: ", JSON.stringify(context, null, 2))
          reply("I don't know what to do yet.")  
        })



      } else {
        reply("A bad thing happened.")
      }

    })
  }

})
 
http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')