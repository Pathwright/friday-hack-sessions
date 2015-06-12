/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var DeadDropView = require("./Components/DeadDropView")
var NoteForm = require("./Components/NoteForm")

var notesStore = require("./Stores/NotesStore")

var DeadDrop = React.createClass({

  render: function() {
    console.log("DeadDrop.render()", this.notesStore)
    return (
      <NavigatorIOS
        ref="appNavigator"
        style={styles.container}
        tintColor="#FF6600"
        initialRoute={{
          title: "Dead Drops",
          component: DeadDropView,
          rightButtonTitle: "Add Note",
          passProps: {notesStore: notesStore},
          onRightButtonPress: () => {
            this.refs.appNavigator.push({
              title: "test",
              component: NoteForm,
              passProps: {notesStore: notesStore},
              rightButtonTitle: "Save Note",
              onRightButtonPress: () => {
                notesStore.addDraftNote()
                this.refs.appNavigator.pop()
                this.setState({"foo": "bar"})
              }
          })}
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  view: {
    flex: 1,
    paddingTop: 70,
  },
  listItem: {
     padding: 10,
  },
  seperator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

AppRegistry.registerComponent('DeadDrop', () => DeadDrop);
