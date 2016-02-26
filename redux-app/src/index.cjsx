require("expose?React!react")
require("expose?_!lodash")

ReactDOM = require("react-dom")

App = require("./App")

ReactDOM.render(<App />, document.getElementById('app'))