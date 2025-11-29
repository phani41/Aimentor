import { motion, AnimatePresence } from "framer-motion";

function ChatPage({ 
  problem, setProblem, 
  language, setLanguage, 
  hint, loading, level, 
  onGenerateResponse 
}) {
  return (
    <motion.div key="main" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      className="h-[480px] overflow-y-auto space-y-3">

      <select value={language} onChange={e=>setLanguage(e.target.value)}
        className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded">
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
      </select>

      <textarea rows={3}
        value={problem} onChange={e=>setProblem(e.target.value)}
        placeholder="Ask me anything - coding problems, questions, or general topics..."
        className="w-full bg-gray-800 text-white p-3 border border-gray-600 rounded resize-none" />

      <div className="flex gap-2">
        <button onClick={()=>onGenerateResponse(false)} disabled={!problem.trim()||loading}
          className="flex-1 bg-green-600 py-2 rounded hover:bg-green-700 disabled:opacity-50 text-white">
          {loading?"Loading...":`Hint ${level}`}
        </button>

        <button onClick={()=>onGenerateResponse(true)} disabled={!problem.trim()||loading}
          className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-white">
          Answer
        </button>
      </div>

      <AnimatePresence>
        {hint && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            className="bg-gray-900 text-white p-3 rounded border border-gray-700 whitespace-pre-wrap text-sm">
            {hint}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default ChatPage;