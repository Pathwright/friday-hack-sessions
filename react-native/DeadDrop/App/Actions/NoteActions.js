var alt = require('../alt');

var NotesFetcher = require("../Utils/NotesFetcher")

class NoteActions {
  
  fetchNotes() {
    this.dispatch()
    NotesFetcher.fetch()
      .then((notes) => {
        this.actions.updateNotes(notes)
      })
      .catch((error) => {
        this.actions.notesFailed(error)
      })
  }

  updateNotes(notes) {
    this.dispatch(notes)
  }

  notesFailed(error) {
    this.dispatch(error)
  }

  saveDraftNote(text) {
    this.dispatch(text)
  }

  draftNote(text) {
    this.dispatch(text)
  }


}

module.exports = alt.createActions(NoteActions);