function TaskDetailsModal({
  selectedTask,
  setSelectedTask,
  newNote,
  setNewNote,
  addNote,
  updateTask,
}) {
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
            <strong>Notes History</strong>

            {selectedTask.notes.map((note) => (
              <div key={note.id} className="note-card">
                <p>{note.text}</p>
                <small>{note.date}</small>
              </div>
            ))}
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