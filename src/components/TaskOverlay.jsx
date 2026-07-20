import { DragOverlay } from "@dnd-kit/react";

function TaskOverlay({ activeTask }) {
  return (
    <DragOverlay dropAnimation={null}>
      {activeTask ? (
        <div className="task-card">
          {activeTask.title}
        </div>
      ) : null}
    </DragOverlay>
  );
}

export default TaskOverlay;