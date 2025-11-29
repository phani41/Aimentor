import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import ChatPage from "./components/ChatPage";
import HistoryPage from "./components/HistoryPage";
import { useAI } from "./hooks/useAI";
import { useFirestore } from "./hooks/useFirestore";
import "./App.css";

function App() {
  const [problem, setProblem] = useState("");
  const [hint, setHint] = useState("");
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [language, setLanguage] = useState("python");
  
  const { generateResponse, loading } = useAI();
  const { saveToFirestore, getHistory } = useFirestore();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) window.location.reload();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const saveToHistory = async (entry) => {
    await saveToFirestore(entry);
    const updated = [entry, ...history];
    setHistory(updated);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const newChat = () => {
    setProblem("");
    setHint("");
    setLevel(1);
    setShowHistory(false);
  };

  const handleGenerateResponse = async (isFinal = false) => {
    const response = await generateResponse(problem, language, level, isFinal);
    if (response) {
      setHint(response);
      const entry = {
        problem,
        type: isFinal ? "Final Answer" : `Hint ${level}`,
        response,
        time: new Date().toLocaleString(),
      };
      saveToHistory(entry);
      if (!isFinal) setLevel(prev => (prev < 5 ? prev + 1 : prev));
    }
  };

  useEffect(() => {
    loadHistory();
    try {
      chrome?.storage?.local?.get(["detectedProblem"], (res) => {
        if (res?.detectedProblem) {
          const { title, description, site } = res.detectedProblem;
          setProblem(`${title}\n\n${description}`);
          console.log(`Auto-detected problem from ${site}`);
        }
      });
    } catch (e) {
      console.warn("Chrome storage not accessible:", e);
    }
  }, []);

  return (
    <div className="w-[350px] h-[560px] bg-black text-white rounded-3xl border border-gray-700 p-3 overflow-hidden">
      <Header 
        onNewChat={newChat}
        onToggleHistory={() => setShowHistory(p => !p)}
        showHistory={showHistory}
      />
      
      <AnimatePresence mode="wait">
        {!showHistory ? (
          <ChatPage 
            problem={problem}
            setProblem={setProblem}
            language={language}
            setLanguage={setLanguage}
            hint={hint}
            loading={loading}
            level={level}
            onGenerateResponse={handleGenerateResponse}
          />
        ) : (
          <HistoryPage 
            history={history}
            onClearHistory={clearHistory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;