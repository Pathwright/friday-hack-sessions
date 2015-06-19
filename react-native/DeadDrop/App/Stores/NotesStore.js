var alt = require('../alt');
var NotesActions = require('../Actions/NoteActions');

class NoteStore {
  constructor() {
    this.notes = [];
    this.errorMessage = ""
    this.draftNote = ""

    this.bindListeners({
      handleFetchNotes: NotesActions.FETCH_NOTES,
      handleUpdateNotes: NotesActions.UPDATE_NOTES,
      handleNotesFailed: NotesActions.NOTES_FAILED,
      handleSaveDraftNote: NotesActions.SAVE_DRAFT_NOTE,
      handleDraftNote: NotesActions.DRAFT_NOTE,
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

  handleSaveDraftNote() {
    this.notes.push({id: this.notes.length, body: this.draftNote})
    this.draftNote = ""
  }  
  
  handleDraftNote(text) {
    this.draftNote = text
    // don't trigger change
    return false
  }

}

module.exports = alt.createStore(NoteStore, 'NoteStore');
