import { motion } from "framer-motion";

function HistoryPage({ history, onClearHistory }) {
  return (
    <motion.div key="history" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      className="h-[480px] overflow-y-auto space-y-3">

      {history.length > 0 && (
        <button onClick={onClearHistory}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700 text-white">
          Clear History
        </button>
      )}

      {history.length === 0 ? (
        <p className="text-center text-gray-400 mt-24">No history yet</p>
      ) : history.map((item, i) => (
        <div key={i} className="p-3 bg-gray-900 border border-gray-700 rounded">
          <p className="text-xs text-gray-400 mb-1">{item.time}</p>
          <p className="font-bold text-yellow-300">{item.type}</p>
          <p className="text-white text-sm mt-1">{item.problem.slice(0,70)}...</p>
        </div>
      ))}
    </motion.div>
  );
}

export default HistoryPage;