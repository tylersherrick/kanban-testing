import Column from "./Column";
import TaskCard from "./TaskCard";

function Board({
  tasks,
  setSelectedTask,
}) {
  return (
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
  );
}

export default Board;