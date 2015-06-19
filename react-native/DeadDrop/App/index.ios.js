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
  NavigatorIOS,
  ActivityIndicatorIOS
} = React;

var DeadDropView = require("./Components/DeadDropView")
var NoteForm = require("./Components/NoteForm")

var NotesStore = require("./Stores/NotesStore")
var NoteActions = require("./Actions/NoteActions")

var DeadDrop = React.createClass({

  getInitialState: function () {
      return {
          notes: [],  
      };
  },

  componentDidMount: function () {
    NotesStore.listen(this.onChange)
    NoteActions.fetchNotes()        
  },

  componentWillUnmount: function () {
      NotesStore.unlisten(this.onChange)  
  },

  onChange: function(state){
    this.setState(state)
  },  

  render: function() {

    if (!this.state.notes.length) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={true}
            style={[styles.centering, {height: 80}]}
            size="large"
          />        
        </View>
      )
    } else {

      return (
        <NavigatorIOS
          ref="appNavigator"
          style={styles.container}
          tintColor="#FF6600"
          initialRoute={{
            title: "Dead Drops",
            component: DeadDropView,
            rightButtonTitle: "Add Note",
            passProps: {notes: this.state.notes},
            onRightButtonPress: () => {
              this.refs.appNavigator.push({
                title: "test",
                component: NoteForm,
                passProps: {notes: this.state.notes},
                rightButtonTitle: "Save Note",
                onRightButtonPress: () => {
                  //notesStore.addDraftNote()
                  this.refs.appNavigator.pop()
                }
            })}
          }}/>
      );
    }
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
