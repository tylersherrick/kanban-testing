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


        // Delete task
        if (targetColumn === "trash") {
          setTasks((prev) =>
            prev.filter((task) => task.id !== draggedId)
          );

          return;
        }


        // Move existing task
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


        // Create new task
        if (draggedId === "task-template") {
          setTasks((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              title: taskName || "New Task",
              column: targetColumn,
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
          <Column id="todo" title="Todo">
            {tasks
              .filter((task) => task.column === "todo")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </Column>

          <Column id="doing" title="Doing">
            {tasks
              .filter((task) => task.column === "doing")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </Column>

          <Column id="done" title="Done">
            {tasks
              .filter((task) => task.column === "done")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </Column>
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="task-card">
            {activeTask.title}
          </div>
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
}

export default App;