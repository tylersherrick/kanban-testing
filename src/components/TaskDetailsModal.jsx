import { useState } from "react";

function TaskDetailsModal({
  selectedTask,
  setSelectedTask,
  newNote,
  setNewNote,
  addNote,
  updateTask,
}) {
  const [notesNewestFirst, setNotesNewestFirst] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const sortedNotes = notesNewestFirst
    ? selectedTask.notes?.slice().reverse()
    : selectedTask.notes;

  function deleteNote() {
    setSelectedTask({
      ...selectedTask,
      notes: selectedTask.notes.filter(
        (note) => note.id !== noteToDelete.id
      ),
    });

    setNoteToDelete(null);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{selectedTask.title}</h2>

        <p>
          <strong>Current Stage:</strong>
          <br />
          {selectedTask.column.charAt(0).toUpperCase() +
            selectedTask.column.slice(1)}
        </p>

        <label>
          <strong>Priority</strong>
        </label>

        <select
          value={selectedTask.priority || "Medium"}
          onChange={(e) =>
            setSelectedTask({
              ...selectedTask,
              priority: e.target.value,
            })
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <label>
          <strong>Add Note</strong>
        </label>

        <textarea
          value={newNote}
          placeholder="Write an update..."
          onChange={(e) => setNewNote(e.target.value)}
        />

        <button onClick={addNote}>
          Add Note
        </button>

        {selectedTask.notes?.length > 0 && (
          <div className="notes-section">
            <div className="notes-header">
              <strong>Notes History</strong>

              <button
                className="sort-button"
                onClick={() =>
                  setNotesNewestFirst(!notesNewestFirst)
                }
              >
                {notesNewestFirst
                  ? "↓ Newest First"
                  : "↑ Oldest First"}
              </button>
            </div>

            {sortedNotes.map((note) => (
              <div key={note.id} className="note-card">
                <button
                  className="delete-note-button"
                  onClick={() => setNoteToDelete(note)}
                >
                  ✕
                </button>

                <p>{note.text}</p>
                <small>{note.date}</small>
              </div>
            ))}
          </div>
        )}

        {noteToDelete && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Delete Note?</h2>

              <p>
                Are you sure you want to remove this note?
              </p>

              <div className="modal-buttons">
                <button
                  onClick={() => setNoteToDelete(null)}
                >
                  Cancel
                </button>

                <button
                  className="delete-btn"
                  onClick={deleteNote}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="modal-buttons">
          <button
            onClick={() => {
              setSelectedTask(null);
              setNewNote("");
            }}
          >
            Cancel
          </button>

          <button onClick={updateTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;