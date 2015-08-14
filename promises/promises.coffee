Promise = require("promise")
request = require('request')

loginUser =->
  new Promise (resolve, reject)->
    console.log "requesting API..."
    request "http://uifaces.com/api/v1/random", (err, response, body)->
      if not err
        resolve(JSON.parse(body))
      else
        reject(err)


add10 = (v)-> v+10
log = (v)-> 
  console.log v
  return v

brokenFunc = -> Promise.reject("BAD!")

saveValueToCloud = (v)->
  console.log "saveValueToCloud..."
  new Promise (resolve, reject)->
    setTimeout =>
      console.log "saved: #{v}"
      resolve(v)
    , 1000

# promise = Promise.resolve(0)

# promise
#   .then(add10)
#   .then(log)
#   .then(add10)
#   .then(saveValueToCloud)
#   .then(log)
#   .then(add10)
#   .then(log)
#   .then(getUserFace)
#   .then (user)->
#     console.log user.username
#   .catch (err)-> console.error(err)

sayHiToUser = (user)-> console.log "Hi #{user.username}!"

user = loginUser()

user.then(sayHiToUser)
user.then(sayHiToUser)
user.then(sayHiToUser)
user.then(sayHiToUser)



