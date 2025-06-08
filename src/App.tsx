import { useState, useCallback, useMemo } from "react";
import { questionAnswers } from "./constants/questionAnswers";

function App() {
  const [player, setPlayer] = useState({
    name: "",
    score: 0,
  });

  const [nearestValue, setNearestValue] = useState(10);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [tempName, setTempName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);

  const alphabetNumbering = useMemo(() => ["a.", "b.", "c.", "d."], []);

  const handleAnswerSelect = useCallback((questionNumber:number, answer:number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setPlayer((prev) => ({ ...prev, score: 0 }));
    setSelectedAnswers({});
  }, []);

  const calculateCorrectAnswer = useCallback((number:number, roundTo:number) => {
    return Math.round(number / roundTo) * roundTo;
  }, []);

  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    questionAnswers.forEach((qA) => {
      const correctAnswer = calculateCorrectAnswer(qA.number, nearestValue);
      if (selectedAnswers[qA.number] === correctAnswer) {
        correctCount++;
      }
    });
    setPlayer((prev) => ({ ...prev, score: correctCount }));
  }, [selectedAnswers, nearestValue, calculateCorrectAnswer]);

  const handleNameSubmit = useCallback(() => {
    if (tempName.trim()) {
      setPlayer((prev) => ({ ...prev, name: tempName.trim() }));
      setShowNameModal(false);
    }
  }, [tempName]);

  const handleKeyPress = useCallback(
    (e:any) => {
      if (e.key === "Enter") {
        handleNameSubmit();
      }
    },
    [handleNameSubmit]
  );

  const questionComponents = useMemo(() => {
    return questionAnswers.map((qA) => {
      const selectedAnswer = selectedAnswers[qA.number];

      return (
        <div key={qA.number} className="my-1 text-left mx-auto">
          <div className="py-0.5">
            {qA.number} rounded off to the nearest {nearestValue.toString()} is
          </div>
          <div className="text-left w-full mx-auto py-1">
            {qA.answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;

              return (
                <button
                  key={`${qA.number}-${index}-${answer}`}
                  className={`py-1 flex cursor-pointer w-max transition-colors rounded-full ${
                    isSelected
                      ? "border-2 border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleAnswerSelect(qA.number, answer)}
                >
                  <div className="mr-1 rounded-full py-1 px-2">
                    {alphabetNumbering[index]}
                  </div>
                  <p className="py-1 px-2">{answer}</p>
                </button>
              );
            })}
          </div>
        </div>
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

      {/*name modal - full screen overlay*/}
      {showNameModal && (
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
              onKeyPress={handleKeyPress}
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
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
