import "./App.css";
import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import DeleteModal from "./components/DeleteModal";
import Board from "./components/Board";
import TaskDetailsModal from "./components/TaskDetailsModal";
import Toolbox from "./components/Toolbox";
import TaskOverlay from "./components/TaskOverlay";

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
        <Toolbox
          taskName={taskName}
          setTaskName={setTaskName}
        />

        <Board
          tasks={tasks}
          setSelectedTask={setSelectedTask}
        />
      </div>

      <TaskOverlay activeTask={activeTask} />

      {selectedTask && (
        <TaskDetailsModal
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          newNote={newNote}
          setNewNote={setNewNote}
          addNote={addNote}
          updateTask={updateTask}
        />
      )}

      {taskToDelete && (
        <DeleteModal
          taskToDelete={taskToDelete}
          setTaskToDelete={setTaskToDelete}
          setTasks={setTasks}
        />
      )}
    </DragDropProvider>
  );
}

export default App;