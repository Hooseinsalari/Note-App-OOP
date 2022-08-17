export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onEditNotes, onSelectedNote } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onEditNotes = onEditNotes;
    this.onSelectedNote = onSelectedNote

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
        const inputValue = noteInput.value.trim();
        const textareaValue = noteTextarea.value.trim();

        this.onEditNotes(inputValue, textareaValue);
      });
    });
  }

  #createListItemHTML(id, title, body, date) {
    const MAX_BODY_LENGTH = 50;

    return `
    <div class="notes__item" data-note-id="${id}">
        <div class="notes__title">${title}</div>
        <div class="notes__body">
            ${body.substring(0, MAX_BODY_LENGTH)}
            ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notes__date">
        ${new Date(date).toLocaleString("en", {
          dateStyle: "full",
          timeStyle: "short",
        })}
        </div>
    </div>
    `;
  }

  updateNoteList(notes) {
    const notesListConteiner = this.root.querySelector(".notes__list");

    notesListConteiner.innerHTML = "";
    let notesList = "";
    for (let note of notes) {
      const { id, title, body, date } = note;
      const htmlContent = this.#createListItemHTML(id, title, body, date);
      notesList += htmlContent;
    }
    notesListConteiner.innerHTML = notesList;
    notesListConteiner.querySelectorAll(".notes__item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onSelectedNote(noteItem.dataset.noteId);
      });
    });
  }
}
