require('coffee-script/register')

var env = process.env.NODE_ENV || "development"

module.exports = require('./webpack/webpack.' + env + '.coffee')