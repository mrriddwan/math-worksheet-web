import { useState } from "react";
import "./App.css";
import { questionAnswers } from "./constants/questionAnswers";

function App() {
  const [player, setPlayer] = useState({
    name: "Amir",
    score: 0,
  });

  const [nearestValue, setNearestValue] = useState(10);
  const alphabetNumbering = ["a.", "b.", "c.", "d."];

  return (
    <div className="bg-white h-screen w-screen">
      {/*title*/}
      <div>Rounding Off to Nearest 10</div>

      {/*name and score*/}
      <div className="flex flex-row gap-5 justify-center p-5">
        <div>
          <h2>Name</h2>
          <h3>{player.name}</h3>
        </div>
        <div>
          <h2>Score</h2>
          <h3>{player.score}</h3>
        </div>
      </div>

      <div>Circle the correct answer</div>
      {/*question*/}
      <div className="grid grid-cols-2">
        {questionAnswers.map((qA) => {
          return (
            <div key={qA.number} className="my-2 text-left mx-auto">
              <div className="py-2">
                {qA.number} rounded off to the nearest {nearestValue.toString()}{" "}
                is
              </div>
              <ol className="text-left w-full mx-auto py-2">
                {qA.answers.map((answer, index) => {
                  return (
                    <li key={`${index}-${answer}`} className="py-1 flex cursor-pointer w-max">
                      {alphabetNumbering[index]} {answer}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>

      {/*copyright*/}
      <div className="py-3">
        © www.mathinenglish.com
      </div>
    </div>
  );
}

export default App;
