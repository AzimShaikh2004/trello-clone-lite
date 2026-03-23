import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

function Column({ title, status, tasks, onDropTask }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: "30%",
        minHeight: "300px",
        border: "2px dashed #aaa",
        padding: "10px",
        backgroundColor: isOver ? "#f0f0f0" : "#fafafa",
      }}
    >
      <h3>{title}</h3>

      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default Column;