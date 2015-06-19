var alt = require('../alt');
var NotesActions = require('../Actions/NoteActions');

class NoteStore {
  constructor() {
    this.notes = [];
    this.errorMessage = ""

    this.bindListeners({
      handleFetchNotes: NotesActions.FETCH_NOTES,
      handleUpdateNotes: NotesActions.UPDATE_NOTES,
      handleNotesFailed: NotesActions.NOTES_FAILED,
    });
  }

  handleFetchNotes(notes) {
    this.notes = []
  }

  handleUpdateNotes(notes) {
    this.notes = notes;
    this.errorMessage = ""
  }

  handleNotesFailed(error) {
    this.errorMessage = error;
  }

}

module.exports = alt.createStore(NoteStore, 'NoteStore');
