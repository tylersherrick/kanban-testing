import { useDroppable } from "@dnd-kit/react";

function TrashZone() {
  const { ref, isDropTarget } = useDroppable({
    id: "trash",
  });

  return (
    <div
      ref={ref}
      className={isDropTarget ? "trash-zone active" : "trash-zone"}
    >
      🗑 Drop here to delete
    </div>
  );
}

export default TrashZone;