'use strict';

/*

Todo: 
- fix ngrok/webhook connection: https://chatbotsmagazine.com/programming-a-bot-with-facebook-messenger-3e6a3e787f6b#.sdcncmbfzz


*/

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const Bot = require('messenger-bot')

const Wit = require('node-wit').Wit

// Wit stuff

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
      console.log('user said...', request.text)
      console.log('sending...', JSON.stringify(response))
      return resolve()
    })
  },
}

const accessToken = "G6W3F2PYLT2WA5HDNE6IB4QETNAXCOBY"
const witClient = new Wit({accessToken, actions})


// Messenger Bot stuff
let bot = new Bot({
  token: 'EAAC0ZAcUFwG0BADXzBaKb5R8FshY3djPgUGuZB2KbxosQeTRIgVKCD5oDnB4QLG4kGnqVb803uBup7Xg3WL6eZBJ2J9CvHt5D5pmA8dqE1An25ZBB46V8ZCmQwn0BZBjLwLrQDL1OdLlD9yl9HcXZCeiCg4dk95QTr44yFqJI4L5QZDZD',
  verify: 'pathwright_bot',
  app_secret: 'bb3886def1991d975ac319f1d7ed2fb6'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text


  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    // client.message(text, {})
    //   .then ((data)=> {
    //     reply({text: JSON.stringify(data)}, (err)=> {
    //       if (err) throw err    
    //     })
    //   })

    const response = `Hi there ${profile.first_name}, you said: ${text}`
    reply({ text: response }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)

console.log("server listen on http://localhost:3000/")

// let app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }))

// app.get('/', (req, res) => {
//   return bot._verify(req, res)
// })

// app.post('/', (req, res) => {
//   bot._handleMessage(req.body)
//   res.end(JSON.stringify({status: 'ok'}))
// })

// app.post('/test/', (req, res) => {
//   bot._handleMessage(req.body)
//   res.end(JSON.stringify({status: 'ok'}))
// })

// http.createServer(app).listen(3000)





