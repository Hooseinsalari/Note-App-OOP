export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onEditNotes, onSelectedNote, onDeleteNote } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onEditNotes = onEditNotes;
    this.onSelectedNote = onSelectedNote;
    this.onDeleteNote = onDeleteNote;

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

    this.updateNotePreviewVisibility(false)
  }

  #createListItemHTML(id, title, body, date) {
    const MAX_BODY_LENGTH = 50;

    return `
    <div class="note__item" id="item" data-note-id="${id}">
        <div class="note__header">
          <div class="note__title">${title}</div>
          <span class="note__trash" data-note-id="${id}"><i class="icon-trash"></i></span>
        </div>
        <div class="note__body">
            ${body.substring(0, MAX_BODY_LENGTH)}
            ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="note__date">
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

    notesListConteiner.querySelectorAll(".note__item").forEach((noteItem) => {
      noteItem.addEventListener("click", (e) => {
        this.onSelectedNote(noteItem.dataset.noteId);
      });
    });

    notesListConteiner.querySelectorAll(".note__trash").forEach((noteItem) => {
      noteItem.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onDeleteNote(noteItem.dataset.noteId);
      });
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".note__input").value = note.title;
    this.root.querySelector(".note__textarea").value = note.body;

    this.root.querySelectorAll("#item").forEach((n) => {
      n.classList.remove("note__item-selected");
    });

    this.root.querySelector(`#item`).classList.add('note__item-selected')
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector('.note__preview').style.visibility = visible ? 'visible' : 'hidden'
  }
}
