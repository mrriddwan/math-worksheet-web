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
        />
      );
    });
  }, [
    selectedAnswers,
    nearestValue,
    alphabetNumbering,
    handleAnswerSelect,
    calculateCorrectAnswer,
  ]);

  return (
    <div className="bg-white min-h-screen w-screen relative">
      {/*title*/}
      <div className="text-center py-4 text-2xl font-bold">
        Rounding Off to Nearest {nearestValue}
      </div>

      {/*name and score*/}
      <div className="flex flex-col p-3 justify-center">
        <div className="flex flex-row gap-10 justify-center mb-3">
          <div className="text-center">
            <h2 className="font-semibold">Name</h2>
            <h3>{player.name}</h3>
          </div>
          <div className="text-center">
            <h2 className="font-semibold">Score</h2>
            <h3>
              {player.score} / {questionAnswers.length}
            </h3>
          </div>
        </div>

        <div className="justify-center mx-auto">
          <button
            className="w-max rounded-2xl px-3 py-1 bg-amber-200 flex cursor-pointer hover:bg-amber-300 transition-colors"
            onClick={handleReset}
          >
            <svg
              className="my-auto mr-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 12a8 8 0 0 1 14.93-4H16v2h6V4h-2v2.07A10 10 0 1 0 22 12h-2a8 8 0 0 1-16 0z" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="w-[70%] text-center text-lg font-medium mb-4">
          Circle the correct answer
        </div>
      </div>

      {/*questions*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 max-w-6xl mx-auto">
        {questionComponents}
      </div>

      <div className="flex justify-center mt-6 pb-8">
        <button
          className="w-max mx-auto rounded-2xl px-6 py-3 bg-green-200 flex text-center hover:bg-green-300 transition-colors"
          onClick={handleSubmit}
        >
          <svg
            className="my-auto mr-2 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          Submit
        </button>
      </div>

      {/*copyright*/}
      <div className="py-3 text-center text-sm text-gray-500">
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