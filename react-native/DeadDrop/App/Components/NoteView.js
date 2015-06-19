var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var NoteView = React.createClass({

  render: function() {
    return (
      <View style={styles.view}>
        <Text>{this.props.note.body}</Text>
      </View>
    )
  }

})

var styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 70,
  },
})

module.exports = NoteView