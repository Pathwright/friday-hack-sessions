'use strict';

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

 
const session = require("./session")
const bot = require("./bot")

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  return bot._verify(req, res)
})

app.post('/', (req, res) => {
  bot._handleMessage(req.body)
  res.end(JSON.stringify({status: 'ok'}))
})

http.createServer(app).listen(3000)