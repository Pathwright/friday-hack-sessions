module.exports = {
  draftNote: "",
  notes: [
    {id: 1, body: "This is my note!"},
    {id: 2, body: "This is my other note!"},
    {id: 3, body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit asperiores voluptatum quia saepe deleniti, necessitatibus consequuntur suscipit natus ducimus. Magnam quam eaque necessitatibus totam consectetur, libero debitis quaerat maxime cumque?"},
  ],
  addDraftNote: function() {
    this.notes.push({
      id: this.notes.length, 
      body: this.draftNote
    })
    this.draftNote = ""
    this.fireEvent("note:added", this.notes[this.notes.length-1])
  },

  _eventHandlers: {},

  registerEventHandler: function(event, handler) {
    if (!this._eventHandlers[event])
      this._eventHandlers[event] = []
    this._eventHandlers[event].push(handler)
  },

  fireEvent: function(event) {
    var handlers = this._eventHandlers[event]
    if (handlers !== undefined && handlers.length)
      for (var i=0; i<handlers.length;i++)
        handlers[i]()
  },



}