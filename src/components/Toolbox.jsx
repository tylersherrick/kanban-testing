import DraggableTask from "./DraggableTask";
import TrashZone from "./TrashZone";

function Toolbox({
  taskName,
  setTaskName,
}) {
  return (
    <aside className="toolbox">
      <h2>Toolbox</h2>

      <DraggableTask
        id="task-template"
        title={taskName}
        setTitle={setTaskName}
      />

      <TrashZone />
    </aside>
  );
}

export default Toolbox;