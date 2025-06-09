import { useMemo } from "react";
import { questionAnswers } from "./constants/questionAnswers";
import NameModal from "./components/NameModal";
import { QuestionAnswers } from "./components/QuestionAnswers";
import { useQuizGame } from "./hooks/useQuizGame";

function App() {
  const {
    player,
    nearestValue,
    selectedAnswers,
    tempName,
    showNameModal,
    alphabetNumbering,
    answerRevealed,
    totalQuestions,
    answeredCount,
    setTempName,
    handleAnswerSelect,
    handleReset,
    calculateCorrectAnswer,
    handleSubmit,
    handleNameSubmit,
    handleKeyPress,
  } = useQuizGame();

  const questionComponents = useMemo(() => {
    return questionAnswers.map((qA) => {
      const selectedAnswer = selectedAnswers[qA.number];

      return (
        <QuestionAnswers
          key={qA.number}
          qA={qA}
          nearestValue={nearestValue}
          selectedAnswer={selectedAnswer}
          alphabetNumbering={alphabetNumbering}
          handleAnswerSelect={handleAnswerSelect}
          answerRevealed={answerRevealed}
        />
      );
    });
  }, [
    selectedAnswers,
    nearestValue,
    alphabetNumbering,
    handleAnswerSelect,
    calculateCorrectAnswer,
    answerRevealed,
  ]);

  const scorePercentage = answerRevealed ? (player.score / questionAnswers.length) * 100 : 0;
  const getScoreColorClass = () => {
    if (!answerRevealed) return "";
    
    if (scorePercentage >= 80) {
      return "bg-green-100 text-green-800 border border-green-200 rounded-lg px-3 py-2";
    } else if (scorePercentage >= 60) {
      return "bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-lg px-3 py-2";
    } else {
      return "bg-red-100 text-red-800 border border-red-200 rounded-lg px-3 py-2";
    }
  };

  return (
    <div className="bg-white min-h-screen w-screen relative">
      {/* floating Indicator */}
      <div className="fixed left-2 top-1/2 transform -translate-y-1/2 z-50 hidden sm:block">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-3 min-w-[120px]">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 mb-1">Progress</div>
            <div className="text-lg font-bold text-blue-600">
              {answeredCount}/{totalQuestions}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden bg-blue-50 border-b border-blue-200 p-3 fixed top-20">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-blue-800">
            Progress: {answeredCount}/{totalQuestions}
          </span>
          <div className="flex-1 ml-3">
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/*title*/}
      <div className="text-center py-4 px-4 text-xl sm:text-2xl lg:text-3xl font-bold">
        Rounding Off to Nearest {nearestValue}
      </div>

      {/*name and score*/}
      <div className="flex flex-col p-3 px-4 sm:px-6 justify-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center mb-3">
          <div className="text-center">
            <h2 className="font-semibold text-sm sm:text-base">Name</h2>
            <h3 className="text-sm sm:text-base">{player.name}</h3>
          </div>
          <div className="text-center">
            <h2 className="font-semibold text-sm sm:text-base">Score</h2>
            <h3 className={`text-sm sm:text-base ${getScoreColorClass()}`}>
              {player.score} / {questionAnswers.length}
            </h3>
          </div>
        </div>

        <div className="justify-center mx-auto">
          <button
            className="w-max rounded-2xl px-3 py-2 sm:px-4 sm:py-2 bg-amber-200 flex cursor-pointer hover:bg-amber-300 transition-colors text-sm sm:text-base"
            onClick={handleReset}
          >
            <svg
              className="my-auto mr-2 w-3 h-3 sm:w-4 sm:h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 12a8 8 0 0 1 14.93-4H16v2h6V4h-2v2.07A10 10 0 1 0 22 12h-2a8 8 0 0 1-16 0z" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center px-4">
        <div className="w-full sm:w-[70%] text-center text-base sm:text-lg font-medium mb-4">
          Circle the correct answer
        </div>
      </div>

      {/*questions*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-6 max-w-7xl mx-auto">
        {questionComponents}
      </div>

      <div className="flex justify-center mt-6 pb-8 px-4">
        <button
          className="w-max mx-auto rounded-2xl px-6 py-3 sm:px-8 sm:py-4 bg-green-200 flex text-center hover:bg-green-300 transition-colors text-sm sm:text-base"
          onClick={handleSubmit}
        >
          <svg
            className="my-auto mr-2 w-3 h-3 sm:w-4 sm:h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          Submit
        </button>
      </div>

      {/*copyright*/}
      <div className="py-3 text-center text-xs sm:text-sm text-gray-500">
        © www.mathinenglish.com
      </div>

      {/*name modal*/}
      {showNameModal && (
        <NameModal
          handleKeyPress={handleKeyPress}
          tempName={tempName}
          setTempName={setTempName}
          handleNameSubmit={handleNameSubmit}
        />
      )}
    </div>
  );
}

export default App;