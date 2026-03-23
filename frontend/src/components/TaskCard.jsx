import { useDrag } from "react-dnd";

function TaskCard({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid #ccc",
        margin: "5px",
        padding: "5px",
        backgroundColor: "white",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <p>{task.title}</p>
    </div>
  );
}

export default TaskCard;