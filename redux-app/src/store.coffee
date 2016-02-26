{ createStore, applyMiddleware, compose } = require("redux")
thunk = require("redux-thunk")

defaultState =
  user: null
  messages: []

# Actions
login = (username)->
  (dispatch, getState)->
    dispatch({type: "login", username})
    # Call API
    dispatch(recieveUser(username))

recieveUser = (user)->
  {type: "recieve_user", user}


rootReducer = (state=defaultState, action)->
  {type} = action
  switch type
    when "recieve_user"
      {user} = action
      _.assign {}, state, {user}
    else
      state

devTools = window.devToolsExtension() 

store = createStore(rootReducer, {}, compose(applyMiddleware(thunk), devTools))

module.exports = {
  store,
  login,
}