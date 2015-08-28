require("expose?React!react");
require("expose?Radium!radium");
require("expose?_!underscore");
require("expose?Promise!promise");

require("./styles/styles.scss")
var App = require("./App")

React.render(<App />, document.getElementById('root'))
