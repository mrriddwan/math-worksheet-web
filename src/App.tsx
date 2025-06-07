import { useState } from "react";
import "./App.css";
import { questionAnswers } from "./constants/questionAnswers";
import { RiResetLeftFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";

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
        <button className="w-max rounded-2xl px-3 py-2 bg-amber-200 flex self-end">
          <RiResetLeftFill className="my-auto mr-2 " />
          Reset
        </button>
      </div>

      <div className="flex w-full justify-center">
        <div className=" w-[70%]">Circle the correct answer</div>
      </div>
      {/*question*/}
      <div className="grid grid-cols-2">
        {questionAnswers.map((qA) => {
          return (
            <div key={qA.number} className="my-1 text-left mx-auto">
              <div className="py-2">
                {qA.number} rounded off to the nearest {nearestValue.toString()}{" "}
                is
              </div>
              <ol className="text-left w-full mx-auto py-1">
                {qA.answers.map((answer, index) => {
                  return (
                    <li
                      key={`${index}-${answer}`}
                      className="py-1 flex cursor-pointer w-max"
                    >
                      <div className="mr-3">{alphabetNumbering[index]}</div>{" "}
                      {answer}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>

      <button className="w-max mx-auto rounded-2xl px-3 py-2 bg-green-200 flex text-center">
        <GiConfirmed className="my-auto mr-2 " />
        Submit
      </button>

      {/*copyright*/}
      <div className="py-3">© www.mathinenglish.com</div>
    </div>
  );
}

export default App;
