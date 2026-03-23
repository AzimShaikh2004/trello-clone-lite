import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const res = await API.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const createBoard = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await API.post("/boards", { title });
      setTitle("");
      fetchBoards();
    } catch (err) {
      alert("Failed to create board");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      
      {/* Header */}
      <div className="backdrop-blur-md bg-white/20 border-b border-white/30 shadow-lg px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Trello Clone Lite ✨
        </h1>

        <button
          onClick={logout}
          className="bg-white/30 text-white px-5 py-2 rounded-lg backdrop-blur-md hover:bg-white/40 transition font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-10">
        
        {/* Create Board Card */}
        <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/30 mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">
            Create New Board
          </h2>

          <form onSubmit={createBoard} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter board title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/70 focus:outline-none focus:ring-4 focus:ring-pink-300"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-xl font-bold hover:scale-105 transition transform shadow-lg">
              Create
            </button>
          </form>
        </div>

        {/* Boards Section */}
        <h2 className="text-white text-2xl font-bold mb-6">
          Your Boards
        </h2>

        {boards.length === 0 ? (
          <div className="text-white/80 text-lg">
            No boards yet. Create your first masterpiece 🚀
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {boards.map((board) => (
              <div
                key={board._id}
                onClick={() => navigate(`/board/${board._id}`)}
                className="cursor-pointer bg-white/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/40 hover:scale-105 hover:shadow-3xl transition transform duration-300"
              >
                <h3 className="text-white text-xl font-bold">
                  {board.title}
                </h3>
                <p className="text-white/80 mt-3">
                  Click to enter →
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;