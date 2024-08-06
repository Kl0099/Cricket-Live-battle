import React, { useEffect, useState } from "react";
import playerImage from "../assets/cricketground.jpg";
import "../App.css";

const NewCard = ({
  name,
  category,
  batting,
  bowling,
  currentTurn,
  setCurrentTurn,
  currentInning,
  SetcurrentInning,
  over,
  setOver,
  previousPlayers,
  setPreviousPlayers,
  backet,
  setBacket,
  computerCardIndex,
  computerIndex,
  setcomputerIndex,
  type,
  currentBattingTurn,
  setcurrentBattingTurn,
}) => {
  const [isflipped, setIsflipped] = useState(false);
  const [isSecondInningStart, setisSecondInningStart] = useState(false);
  useEffect(() => {
    //  console.log("card index :" , computerCardIndex);
    //   console.log("name :" , name)

    if (currentTurn === "computer" && computerCardIndex === name) {
      // setTimeout(() => {
      setTimeout(() => {
        setIsflipped(true);
        setCurrentTurn("user");
        setcomputerIndex("");
        document.body.style.pointerEvents = 'auto';
      }, 400);
    }
  }, [currentTurn, computerCardIndex]);
  const handleCardClick = () => {
    // console.log('Card clicked')
    setIsflipped(true);
    setPreviousPlayers([
      ...previousPlayers,
      {
        name: name,
        category: category,
        batting: batting,
        bowling: bowling,
      },
    ]);
    setBacket([
      ...backet,
      {
        name: name,
        category: category,
        batting: batting,
        bowling: bowling,
      },
    ]);
    setCurrentTurn("computer");
    document.body.style.pointerEvents = 'none';
  };

  useEffect(() => {
    if (currentInning === 2 && !isSecondInningStart) {
      // console.log("current inning is 2")
      setIsflipped(false);
      setisSecondInningStart(true);
    }
  }, [currentInning, currentTurn]);

  const whichTurn = () => {
    if (isflipped) {
      return true;
    }
    if (
      !isflipped &&
      ((type === "bowling" &&
        currentTurn === "user" &&
        currentBattingTurn === "user") ||
        (type === "batting" &&
          currentTurn === "user" &&
          currentBattingTurn === "computer"))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className="card-container hover:cursor-pointer hover:scale-95"
      onClick={whichTurn() ? (e) => e.preventDefault() : handleCardClick}
    // onClick={handleCardClick}
    >
      <div className={`card ${isflipped ? "is-flipped" : ""}`}>
        <div
          className="card-front"
          style={{ backgroundImage: `url(${playerImage})` }}
        ></div>
        <div className="card-back p-2 text-white">
          <div className="text-center">
            <div className="text-lg font-bold">{name}</div>
            <div className="text-sm">{category}</div>
          </div>
          <div className="flex flex-col justify-end h-full">
            <div className="text-xs"></div>
            <div className="text-xs">Wickets: </div>
            <div className="text-xs">Bowl SR: </div>
            <div className="text-xs">IPL Runs: </div>
            <div className="text-xs">High Score: </div>
            <div className="text-xs">Bat Avg: </div>
            <div className="flex gap-5 mt-2">
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold">{bowling}</div>
                <div className="text-xs">Bowling</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold">{batting}</div>
                <div className="text-xs">Batting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
