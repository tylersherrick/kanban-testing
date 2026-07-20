import "./App.css";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useState } from "react";
import DraggableTask from "./components/DraggableTask";
import TaskCard from "./components/TaskCard";
import Column from "./components/Column";
import TrashZone from "./components/TrashZone";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [activeTask, setActiveTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newNote, setNewNote] = useState("");

  const updateTask = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? selectedTask
          : task
      )
    );

    setSelectedTask(null);
    setNewNote("");
  };

  const addNote = () => {
    if (!newNote.trim()) return;

    setSelectedTask({
      ...selectedTask,
      notes: [
        ...(selectedTask.notes || []),
        {
          id: crypto.randomUUID(),
          text: newNote,
          date: new Date().toLocaleString(),
        },
      ],
    });

    setNewNote("");
  };

  return (
    <DragDropProvider
      onDragStart={(event) => {
        const draggedId = event.operation.source?.id;

        if (draggedId === "task-template") {
          setActiveTask({
            title: taskName || "New Task",
          });
          return;
        }

        const draggedTask = tasks.find(
          (task) => task.id === draggedId
        );

        setActiveTask(draggedTask);
      }}

      onDragEnd={(event) => {
        setActiveTask(null);

        if (event.canceled) return;

        const targetColumn = event.operation.target?.id;
        const draggedId = event.operation.source?.id;

        if (!targetColumn) return;

        if (targetColumn === "trash") {
          const existingTask = tasks.find(
            (task) => task.id === draggedId
          );

          if (existingTask) {
            setTaskToDelete(existingTask);
          }

          return;
        }

        const existingTask = tasks.find(
          (task) => task.id === draggedId
        );

        if (existingTask) {
          setTasks((prev) =>
            prev.map((task) =>
              task.id === draggedId
                ? {
                    ...task,
                    column: targetColumn,
                  }
                : task
            )
          );

          return;
        }

        if (draggedId === "task-template") {
          setTasks((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              title: taskName || "New Task",
              column: targetColumn,
              priority: "Medium",
              notes: [],
            },
          ]);

          setTaskName("");
        }
      }}

      onDragCancel={() => {
        setActiveTask(null);
      }}
    >
      <div className="app">
        <aside className="toolbox">
          <h2>Toolbox</h2>

          <DraggableTask
            id="task-template"
            title={taskName}
            setTitle={setTaskName}
          />

          <TrashZone />
        </aside>

        <main className="board">
          {["todo", "doing", "done"].map((column) => (
            <Column
              key={column}
              id={column}
              title={
                column.charAt(0).toUpperCase() +
                column.slice(1)
              }
            >
              {tasks
                .filter((task) => task.column === column)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={setSelectedTask}
                  />
                ))}
            </Column>
          ))}
        </main>
      </div>


      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="task-card">
            {activeTask.title}
          </div>
        ) : null}
      </DragOverlay>


      {/* Task Details Modal */}
      {selectedTask && (
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


            <br />


            <label>
              <strong>Add Note</strong>
            </label>

            <textarea
              value={newNote}
              placeholder="Write an update..."
              onChange={(e) =>
                setNewNote(e.target.value)
              }
            />

            <button onClick={addNote}>
              Add Note
            </button>


            {selectedTask.notes?.length > 0 && (
              <>
                <br />

                <strong>Notes History</strong>

                {selectedTask.notes.map((note) => (
                  <div
                    key={note.id}
                    className="note-card"
                  >
                    <p>{note.text}</p>
                    <small>{note.date}</small>
                  </div>
                ))}
              </>
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
      )}


      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Delete Task?</h2>

            <p>
              Are you sure you want to delete this task?
            </p>

            <br />

            <p>
              <strong>Task:</strong>
              <br />
              "{taskToDelete.title}"
            </p>

            <br />

            <p>
              <strong>Current Stage:</strong>
              <br />
              {taskToDelete.column.charAt(0).toUpperCase() +
                taskToDelete.column.slice(1)}
            </p>

            <br />

            <p>
              <strong>Priority:</strong>
              <br />
              {taskToDelete.priority || "Medium"}
            </p>


            {taskToDelete.notes?.length > 0 && (
              <>
                <br />

                <strong>Notes History:</strong>

                {taskToDelete.notes.map((note) => (
                  <div
                    key={note.id}
                    className="note-card"
                  >
                    <p>{note.text}</p>
                    <small>{note.date}</small>
                  </div>
                ))}
              </>
            )}


            <br />

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
      )}
    </DragDropProvider>
  );
}

export default App;