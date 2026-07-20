import { useDraggable } from "@dnd-kit/react";

function TaskCard({ task, onClick }) {
  const { ref } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={ref}
      className="task-card"
      onClick={() => onClick(task)}
    >
      <div className="task-title">
        {task.title}
      </div>

      {task.priority && (
        <div className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </div>
      )}
    </div>
  );
}

export default TaskCard;