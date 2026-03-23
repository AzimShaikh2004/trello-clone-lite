import { motion } from "framer-motion";
import { CheckCircle, Layers, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">

      {/* ===== NAVBAR ===== */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="flex justify-between items-center px-8 py-5">
          <h1 className="text-2xl font-bold tracking-wide hover:opacity-80 transition">
            Trello Clone Lite
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 font-semibold hover:scale-105 transition duration-300 shadow-lg"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-28">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Organize Work.
          <br />
          <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Achieve More.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl"
        >
          A modern Kanban productivity platform built for teams and individuals.
          Clean UI. Smooth Drag & Drop. Real productivity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex gap-6 flex-wrap justify-center"
        >
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl font-bold hover:scale-105 transition duration-300 shadow-xl"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition duration-300"
          >
            Login
          </button>
        </motion.div>
      </div>

      {/* ===== FEATURES SECTION ===== */}
      <div className="mt-32 px-10 pb-24 grid md:grid-cols-3 gap-12">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 transition duration-300"
        >
          <Layers size={40} className="text-pink-400 mb-4" />
          <h3 className="text-xl font-semibold mb-3">
            Powerful Boards
          </h3>
          <p className="text-gray-300">
            Create multiple boards and manage tasks visually using intuitive Kanban columns.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 transition duration-300"
        >
          <Zap size={40} className="text-indigo-400 mb-4" />
          <h3 className="text-xl font-semibold mb-3">
            Smooth Drag & Drop
          </h3>
          <p className="text-gray-300">
            Experience lightning-fast task movement with optimized interactions.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 transition duration-300"
        >
          <CheckCircle size={40} className="text-green-400 mb-4" />
          <h3 className="text-xl font-semibold mb-3">
            Dark Mode & Modern UI
          </h3>
          <p className="text-gray-300">
            Designed with glassmorphism and smooth animations for premium experience.
          </p>
        </motion.div>

      </div>

      {/* ===== FOOTER ===== */}
      <div className="text-center py-8 text-gray-400 border-t border-white/10">
        © {new Date().getFullYear()} Trello Clone Lite — Built by Mohammed Azim Ajaz Shaikh 🚀
      </div>
    </div>
  );
}

export default Landing;