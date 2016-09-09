'use strict';

const session = require("./session")
const Wit = require('node-wit').Wit
const accessToken = "G6W3F2PYLT2WA5HDNE6IB4QETNAXCOBY"

const actions = {
  
  getGrade(request) {
    console.log("getGrade.request: ", request)
    const {sessionId, context, entities} = request
    const { intent } = entities
    const className = entities.className && entities.className[0].value

    if (intent && intent[0].confidence < .8) {
      return Promise.resolve({did_not_understand: true})
    }

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
    console.log("getNextStep.request: ", request)
    return Promise.resolve({ next_step_name: "To-Do: Finish everything", next_step_due: "Yesterday" })
  },

  send(request, response) {

    const {sessionId, context, entities} = request
    const {text, quickreplies} = response

    return new Promise(function(resolve, reject) {
      const bot = require("./bot")
      let userSession = session.get(sessionId)

      console.log("sending response: ", response)
      console.log("request: ", request)

      bot.sendMessage(userSession.recipient, response, (err)=> {
        
      })
      return resolve()
    })
  },
}

const witClient = new Wit({accessToken, actions})

module.exports = witClient