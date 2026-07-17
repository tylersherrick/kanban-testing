import { useDroppable } from "@dnd-kit/react";

function Column({ id, title, children }) {
  const { ref, isDropTarget } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className={isDropTarget ? "column active" : "column"}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Column;