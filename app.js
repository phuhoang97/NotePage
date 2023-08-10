const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const addNoteButton = document.getElementById("add-note");
const noteList = document.getElementById("note-list");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  noteList.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const li = document.createElement("li");
    li.innerHTML = `
            <div class="note">
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button class="delete-note" data-index="${i}">Delete</button>
            </div>
        `;
    noteList.appendChild(li);
  }
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

addNoteButton.addEventListener("click", function () {
  const title = noteTitle.value;
  const content = noteContent.value;

  if (title && content) {
    notes.push({ title, content });
    saveNotes();
    renderNotes();
    noteTitle.value = "";
    noteContent.value = "";
  }
});

noteList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-note")) {
    const index = event.target.getAttribute("data-index");
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
});

renderNotes();
