var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} = React;

var NoteView = require("./NoteView")

var NotesStore = require("../Stores/NotesStore")



var DeadDropsView = React.createClass({

  getInitialState: function() {

    var notes = this.props.notes

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: this.ds.cloneWithRows(notes),
      location: "unknown"
    };
  },

  checkPosition: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({location: initialPosition})
    );    
  },

  componentDidMount: function() {
    NotesStore.listen(this.onChange)
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

var styles = StyleSheet.create({
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

module.exports = DeadDropsView