import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import popSound from "../assets/pop.mp3";

function Board() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("blue");

  const pop = new Audio(popSound);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  // ✅ Optimized Create Task (No full refetch lag)
  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      description,
      boardId: id,
      status: "todo",
      tag,
    };

    try {
      const res = await API.post("/tasks", newTask);
      setTasks((prev) => [...prev, res.data]);
      pop.play();
    } catch (err) {
      console.error(err);
    }

    setTitle("");
    setDescription("");
    setModalOpen(false);
  };

  // ✅ Optimized Drag (No await blocking UI)
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );

    API.put(`/tasks/${draggableId}`, {
      status: destination.droppableId,
    }).catch(console.error);

    pop.play();
  };

  const getTasks = (status) =>
    tasks.filter((task) => task.status === status);

  const getTagColor = (tag) => {
    switch (tag) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const Column = ({ title, status, color }) => (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`font-bold text-lg ${color}`}>
          {title}
        </h2>
        <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
          {getTasks(status).length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4 min-h-[120px]"
          >
            {getTasks(status).map((task, index) => (
              <Draggable
                key={task._id}
                draggableId={task._id}
                index={index}
              >
                {(provided) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white/90 rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-200"
                  >
                    <div
                      className={`h-2 w-12 rounded-full mb-3 ${getTagColor(
                        task.tag
                      )}`}
                    ></div>

                    <h3 className="font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {task.description}
                    </p>
                  </motion.div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  return (
    <div
      className={`min-h-screen p-10 transition-all duration-500 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600"
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between mb-8">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-white text-indigo-700 px-6 py-2 rounded-xl font-bold shadow hover:scale-105 transition"
        >
          + Add Task
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Column title="Todo" status="todo" color="text-yellow-300" />
          <Column title="Doing" status="doing" color="text-blue-300" />
          <Column title="Done" status="done" color="text-green-300" />
        </div>
      </DragDropContext>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-8 rounded-3xl w-96 shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-4">
                Create New Task
              </h2>

              <form onSubmit={createTask} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border p-2 rounded-xl"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Description"
                  className="w-full border p-2 rounded-xl"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />

                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full border p-2 rounded-xl"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="yellow">Yellow</option>
                </select>

                <button className="w-full bg-indigo-600 text-white py-2 rounded-xl">
                  Create
                </button>
              </form>

              <button
                onClick={() => setModalOpen(false)}
                className="mt-4 text-sm text-gray-500"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Board;