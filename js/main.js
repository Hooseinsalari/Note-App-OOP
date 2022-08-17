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
});
