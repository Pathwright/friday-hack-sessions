{connect} = require("react-redux")

{login} = require("./store")

App = (props)->
  <div>
    <h1>Welcome to the App</h1>
    {
      if props.user
        <h2>Hi {props.user}</h2>
    }
    <a href="#" onClick={-> props.dispatch(login("wmdmark"))}>Login</a>
  </div>


mapStateToProps = (state, ownProps)->
  _.assign {},
    user: state.user
  , ownProps

module.exports = connect(mapStateToProps)(App)