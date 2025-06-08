const NameModal = ({
  handleKeyPress,
  tempName,
  setTempName,
  handleNameSubmit,
}: {
  handleKeyPress: (e:any) => void;
  tempName: string;
  setTempName: any;
  handleNameSubmit: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-800/80 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome to the Quiz!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your name to start
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyUp={handleKeyPress}
          className="w-full rounded-md border border-gray-300 px-4 py-3 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <button
          className={`w-full mx-auto rounded-md px-6 py-3 mt-4 flex items-center justify-center text-white transition-colors ${
            tempName.trim()
              ? "bg-green-500 hover:bg-green-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleNameSubmit}
          disabled={!tempName.trim()}
        >
          <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default NameModal;
