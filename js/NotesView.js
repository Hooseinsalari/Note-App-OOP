export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onEditNotes } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onEditNotes = onEditNotes;

    this.root.innerHTML = `
        <div class="notes__sidebar">
            <div class="notes__logo">
                <h2>Note App</h2>
            </div>
            <div class="notes__list">
            </div>
            <button class="notes__add">Add Note</button>
        </div>

        <form class="note__preview">
            <input class="note__input" type="text" placeholder="add subject ...">
            <textarea class="note__textarea" name="content" id="content" placeholder="add description"></textarea>
        </form>
    `;

    const addNotesBtn = this.root.querySelector(".notes__add");
    const noteInput = this.root.querySelector(".note__input");
    const noteTextarea = this.root.querySelector(".note__textarea");

    addNotesBtn.addEventListener("click", this.onNoteAdd);

    [noteInput, noteTextarea].forEach((e) => {
      e.addEventListener("blur", () => {
        const inputValue = noteInput.value.trim()
        const textareaValue = noteTextarea.value.trim()

        this.onEditNotes(inputValue, textareaValue)
      });
    });
  }
}
