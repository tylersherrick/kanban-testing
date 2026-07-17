import { useDraggable } from "@dnd-kit/react";

function DraggableTask({ id, title, setTitle }) {
  const { ref } = useDraggable({
    id,
    disabled: !title.trim(),
  });

  return (
    <div ref={ref} className="task">
      <input
        type="text"
        placeholder="Create a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default DraggableTask;