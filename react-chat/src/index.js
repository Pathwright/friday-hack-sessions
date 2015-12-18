require("expose?React!react");
require("expose?_!underscore");
require("expose?Promise!promise");

require("./styles/styles.scss")

var ReactDOM = require("react-dom")

var App = require("./App")

ReactDOM.render(<App />, document.getElementById('root'))
