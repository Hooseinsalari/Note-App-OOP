import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const root = document.getElementById("root");

const view = new NotesView(root, {
  onNoteAdd() {
    console.log("add btn click");
  },
  onEditNotes(inputValue, textareaValue) {
    console.log(inputValue, textareaValue);
  },
  onSelectedNote(note) {
    let notes = NotesAPI.getAllNotes()
    const selectedNote = notes.find((n) => n.id === +note)
    // return selectedNote
    console.log(selectedNote);
    // NotesView.updateActiveNote(selectedNote)
  },
  onDeleteNote(note) {
    console.log(note);
  }
});

view.updateNoteList(NotesAPI.getAllNotes());
view.updateActiveNote(NotesAPI.getAllNotes()[0])