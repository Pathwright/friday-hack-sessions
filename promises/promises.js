Promise = require("promise")

function add10(v){ return v+10 }

var promise = new Promise(function(resolve, reject) {
  resolve(0)
})

var promise = Promise.resolve(10)

promise
  .then(add10)
  .then(add10)
  .then(add10)
  .then(console.log)


