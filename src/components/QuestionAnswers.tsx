export const QuestionAnswers = ({
  qA,
  nearestValue,
  selectedAnswer,
  alphabetNumbering,
  handleAnswerSelect,
}: {
  qA: { number: number; answers: number[] };
  nearestValue: number;
  selectedAnswer: number;
  alphabetNumbering: string[];
  handleAnswerSelect: (number: number, answer: number) => void;
}) => {
  return (
    <div  className="my-1 text-left mx-auto">
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
};
