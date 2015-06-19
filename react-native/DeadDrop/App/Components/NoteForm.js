/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

var NoteForm = React.createClass({

  updateNote: function(text) {
    this.props.notesStore.draftNote = text
    this.setState({input: text})
  },

  render: function() {
    return (
      <View style={styles.view}>
        <TextInput
            style={styles.noteInput}
            multiline={true}
            onChangeText={this.updateNote}
          />
      </View>
    );
  }
});


var styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 60,
  },
  noteInput: {
    flex: 1,
  }
});


module.exports = NoteForm;
