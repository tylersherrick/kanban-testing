function DeleteModal({
  taskToDelete,
  setTaskToDelete,
  setTasks,
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Delete Task?</h2>

        <p>
          Are you sure you want to delete this task?
        </p>

        <p>
          <strong>Task:</strong>
          <br />
          {taskToDelete.title}
        </p>

        <p>
          <strong>Current Stage:</strong>
          <br />
          {taskToDelete.column.charAt(0).toUpperCase() +
            taskToDelete.column.slice(1)}
        </p>

        <p>
          <strong>Priority:</strong>
          <br />
          {taskToDelete.priority || "Medium"}
        </p>

        {taskToDelete.notes?.length > 0 && (
          <div className="notes-section">
            <strong>Notes History</strong>

            {taskToDelete.notes.map((note) => (
              <div
                key={note.id}
                className="note-card"
              >
                <p>{note.text}</p>
                <small>{note.date}</small>
              </div>
            ))}
          </div>
        )}

        <p className="delete-warning">
          This action cannot be undone.
        </p>

        <div className="modal-buttons">
          <button
            onClick={() => setTaskToDelete(null)}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setTasks((prev) =>
                prev.filter(
                  (task) => task.id !== taskToDelete.id
                )
              );

              setTaskToDelete(null);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;