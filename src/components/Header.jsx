function Header({ onNewChat, onToggleHistory, showHistory }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-lg font-bold">AiMentor</h1>
      <div className="flex gap-2">
        <button onClick={onNewChat}
          className="text-xs bg-green-700 border border-green-600 px-2 py-1 rounded-full hover:bg-green-600">
          Newchat
        </button>
        <button onClick={onToggleHistory}
          className="text-xs bg-gray-800 border border-gray-600 px-2 py-1 rounded-full hover:bg-gray-700">
          {showHistory ? "← Back" : "History"}
        </button>
      </div>
    </div>
  );
}

export default Header;