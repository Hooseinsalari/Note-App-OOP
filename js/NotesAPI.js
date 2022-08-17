const notes = [
  {
    id: 1,
    title: "first note",
    body: "javascript toturial i love this",
    date: "Tue Aug 16 2022 20:31:09 GMT+0430",
  },
  {
    id: 2,
    title: "first note",
    body: "javascript toturial i love this",
    date: "Tue Aug 15 2022 20:31:09 GMT+0430",
  },
  {
    id: 3,
    title: "first note",
    body: "javascript toturial i love this",
    date: "Tue Aug 17 2022 20:31:09 GMT+0430",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.date) > new Date(b.date) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existedNote = notes.find((note) => note.id === noteToSave.id);
    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.date = new Date().toISOString();
    } else {
      noteToSave.id = Math.random();
      noteToSave.date = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNotes(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
