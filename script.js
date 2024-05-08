// Retrieve notes from localStorage or initialize an empty array
const notes = JSON.parse(localStorage.getItem('notes')) || [];

const notesList = document.getElementById('notes-list');
const noteInput = document.getElementById('note-input');

// Display existing notes on page load
if (notes.length > 0) {
    notes.forEach(note => displayNote(note));
}

function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
        const note = {
            id: Date.now(),
            text: noteText
        };

        notes.push(note);
        saveNotesToLocalStorage();
        displayNote(note);

        // Clear the input field
        noteInput.value = '';
    }
}

function displayNote(note) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${note.text}</span>
        <button onclick="editNote(${note.id})">Edit</button>
        <button onclick="deleteNote(${note.id})">Delete</button>
    `;

    notesList.appendChild(listItem);
}

function editNote(id) {
    const noteToEdit = notes.find(note => note.id === id);

    if (noteToEdit) {
        // Prompt the user to edit the note
        const updatedNoteText = prompt('Edit your note:', noteToEdit.text);

        if (updatedNoteText !== null) {
            noteToEdit.text = updatedNoteText.trim();
            saveNotesToLocalStorage();
            refreshNotes();
        }
    }
}

function deleteNote(id) {
    const confirmDelete = confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
        const indexToDelete = notes.findIndex(note => note.id === id);

        if (indexToDelete !== -1) {
            notes.splice(indexToDelete, 1);
            saveNotesToLocalStorage();
            refreshNotes();
        }
    }
}

function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function refreshNotes() {
    // Clear the current notes in the list
    while (notesList.firstChild) {
        notesList.removeChild(notesList.firstChild);
    }

    // Display the updated notes
    notes.forEach(note => displayNote(note));
}