export const QuestionAnswers = ({
  qA,
  nearestValue,
  selectedAnswer,
  alphabetNumbering,
  handleAnswerSelect,
  answerRevealed,
}: {
  qA: { number: number; answers: number[] };
  nearestValue: number;
  selectedAnswer: number;
  alphabetNumbering: string[];
  handleAnswerSelect: (number: number, answer: number) => void;
  answerRevealed: boolean;
}) => {
  const correctAnswer = Math.round(qA.number / nearestValue) * nearestValue;

  return (
    <div className="my-1 text-left mx-auto">
      <div className="py-0.5">
        {qA.number} rounded off to the nearest {nearestValue.toString()} is
      </div>
      <div className="text-left w-full mx-auto py-1">
        {qA.answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrect = answer === correctAnswer;
          
          let borderClass = "";
          let bgClass = "";
          
          if (answerRevealed) {
            if (isSelected) {
              if (isCorrect) {
                borderClass = "border-2 border-green-500";
                bgClass = "bg-green-50";
              } else {
                borderClass = "border-2 border-red-500";
                bgClass = "bg-red-50";
              }
            } else {
              borderClass = "border border-gray-200";
              bgClass = "bg-gray-50";
            }
          } else {
            if (isSelected) {
              borderClass = "border-2 border-blue-500";
              bgClass = "bg-blue-50";
            } else {
              borderClass = "hover:bg-gray-50";
              bgClass = "";
            }
          }

          return (
            <button
              key={`${qA.number}-${index}-${answer}`}
              className={`py-1 flex cursor-pointer w-max transition-colors rounded-full ${borderClass} ${bgClass}`}
              onClick={() => !answerRevealed && handleAnswerSelect(qA.number, answer)}
              disabled={answerRevealed}
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
};