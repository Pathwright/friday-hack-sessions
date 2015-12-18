# Poor man's store/actions, plus Firebase sync
# --------------------

Firebase = require("firebase")

getStore = ->
  subscribers = []
  state =
    username: "User"
    message: ""
    messages: []

  firebase = new Firebase("https://wmdmark.firebaseio.com/")
  db = firebase.child("react-chat")

  subscribe = (callback)-> 
    subscribers.push(callback)

  onChange = (sync=false)->
    if sync
      # sync messages to firebase
      db.set(state.messages)
    # notify our subscribers
    for subscriber in subscribers
      subscriber(Object.assign({}, state))

  actions =
    login: (username)->
      state.username = username
      onChange()

    watchMessages: ->
      db.on "value", (snap)->
        state.messages = snap.val()
        onChange()
    
    addMessage: ->
      state.messages.push
        username: state.username
        message: state.message
      state.message = ""
      onChange(true)

    setMessage: (message)->
      state.message = message
      onChange()

  {state, actions, subscribe}


# Dumb, state-less Components
# --------------------

Message = (props)->
  {message} = props
  <div className="Message">
    <strong>{message.username}:</strong>
    {message.message}
  </div>

MessageList = (props)->
  {messages} = props
  <div className="MessageList">
    <ul>
      {
        messages.map (message, i)-> 
          <Message message={message} key={i} />
      }
    </ul>
  </div>

MessageInput = (props)->
  {username, message, actions} = props

  onKeyDown = (e)->
    if e.keyCode is 13
      actions.addMessage()

  onChange = (e)->
    actions.setMessage(e.target.value)

  <div>
    <span>{username}:</span>
    <input onChange={onChange} onKeyDown={onKeyDown} value={message} />
  </div>


# Our single top-level "smart" component
# ----------------------------------------
App = React.createClass
  
  getInitialState: ->
    messages: []
    username: ""

  componentWillMount: -> 
    @store = getStore()
    @store.subscribe(@setState.bind(@))

  componentDidMount: ->
    @store.actions.watchMessages()

  render: ->
    {messages, username} = @state
    <div className="App">
      <MessageList messages={messages} />
      <MessageInput {...@state} actions={@store.actions} />
    </div>

module.exports = App
