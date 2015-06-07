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
  ListView,
  TouchableHighlight,
} = React;

var notesData = [
  {id: 1, body: "This is my note!"},
  {id: 2, body: "This is my other note!"},
  {id: 3, body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit asperiores voluptatum quia saepe deleniti, necessitatibus consequuntur suscipit natus ducimus. Magnam quam eaque necessitatibus totam consectetur, libero debitis quaerat maxime cumque?"},
]

var NoteView = React.createClass({

  render: function() {
    return (
      <View style={styles.view}>
        <Text>{this.props.note.body}</Text>
      </View>
    )
  }

})

var LocationStatusView = React.createClass({

  render: function() {

  }, 

})

var DeadDropsView = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(notesData),
      location: "unknown"
    };
  },

  checkPosition: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({location: initialPosition})
    );    
  },

  componentDidMount: function() {
    this.checkPosition()
    this.checkInterval = setInterval( ()=>{this.checkPosition()}, 5000 )
  },


  onSelectNote: function(note){
    this.props.navigator.push({
      title: "Note " + note.id,
      component: NoteView,
      passProps: {note: note}
    });    
  },

  renderNote: function(note) {
    return (
      <TouchableHighlight onPress={()=> this.onSelectNote(note)}>
        <View>
          <View style={styles.listItem}>
            <Text numberOfLines={1}>{note.body}</Text>
          </View>
          <View style={styles.seperator} />
        </View>
      </TouchableHighlight>
    )
  },

  render: function() {
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // }
    return (
      <View style={styles.view}>
        <Text>{ this.state.location }</Text>
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderNote}
          />
      </View>
    );
  },

})

var DeadDrop = React.createClass({

  render: function() {

    return (
      <NavigatorIOS
        ref="appNavigator"
        style={styles.container}
        tintColor="#FF6600"
        initialRoute={{
          title: "Dead Drops",
          component: DeadDropsView,
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

AppRegistry.registerComponent('AwesomeProject', () => DeadDrop);
