require("expose?React!react")
require("expose?_!lodash")

ReactDOM = require("react-dom")

App = require("./App")

{connect, Provider} = require("react-redux")

{store} = require("./store")

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
, document.getElementById('app'))