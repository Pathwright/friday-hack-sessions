Firebase = require("firebase")
firebase = new Firebase("https://wmdmark.firebaseio.com/")
rootRef = firebase.child("react-chat")

Message = (props)->
  {message} = props
  <blockquote className="Message">
    <strong>{message.username}:</strong>
    {message.message}
  </blockquote>

MessageList = React.createClass
  
  render: ->
    {messages} = @props
    <div className="MessageList">
      <ul>
        {
          messages.map (message, i)-> 
            <Message message={message} key={i} />
        }
      </ul>
    </div>

MessageInput = (props)->
  {username, message, addMessage, setMessage} = props

  onKeyDown = (e)->
    if e.keyCode is 13
      actions.addMessage()

  onChange = (e)->
    actions.setMessage(e.target.value)

  <div>
    <span>{username}:</span>
    <input onChange={onChange} onKeyDown={onKeyDown} value={message} />
  </div>

MessageInput.displayName = "MessageInput"


state = 
  username: "Mark"
  message: ""
  messages: [
    {username: "Brad", message: "Hi!"},
    {username: "Mark", message: "Hello!"},
    {username: "Joe", message: "Yo!"},
  ]

subscribers = []
subscribe = (callback)->
  subscribers.push(callback)

onStateChange = (syncState=false)->
  if syncState
    rootRef.set(state.messages)
  for subscriber in subscribers
    subscriber(Object.assign({}, state))

actions =
  login: (username)->
    state.username = username
    onStateChange()
  
  addMessage: ->
    state.messages.push
      username: state.username
      message: state.message
    state.message = ""
    onStateChange(true)

  setMessage: (message)->
    state.message = message
    onStateChange()

  recieveMessages: (messages)->
    state.messages = messages
    onStateChange()

App = React.createClass
  
  shouldComponentUpdate: (prevState, nextState)->
    prevState isnt nextState

  getInitialState: -> state

  componentDidMount: -> 
    subscribe(@setState.bind(@))
    rootRef.on "value", (snap)->
      actions.recieveMessages(snap.val())

  render: ->
    {messages, username} = @state
    <div className="App">
      <MessageList messages={messages} />
      <MessageInput {...@state} actions={actions} />
    </div>

module.exports = App
