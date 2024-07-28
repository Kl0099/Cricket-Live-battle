import React, { useEffect, useState } from "react";
import playerImage from "../assets/cricketground.jpg";
import "../App.css";
import PlayerImages from "../assets/vecteezy_cricket-athlete-player_3688363.jpg";
import { current } from "@reduxjs/toolkit";
let Totalplayers = {
  User: "John cina",
  Computer: "bheem",
};

const Card = ({
  innings,
  turn,
  setTurn,
  flipindex,
  setFlipIndex,
  previes,
  setPreviousies,
  index,
  name,
  category,
  batting,
  bowling,
  selectPlayer,
  type,
  matches,
  wickets,
  bowlSR,
  iplRuns,
  highScore,
  batAvg,
  setIsInningOver,
  determineWinner,
  isInningOver,
  playerOneScore,
  playerTwoScore,
  winnerInSecondInning,
  currentInnig,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    selectPlayer(index, type);
    setIsFlipped(!isFlipped);
    setTurn("computer");
    // if (currentInnig === 2) {
    //   if (playerOneScore.totalruns < score.runs) {
    //     alert("game over ");
    //   }
    //   console.log("hii");
    // }
  };

  useEffect(() => {
    if (
      // type === "bowler" &&
      turn === "computer" &&
      flipindex === name
      // &&
      // innings === 1
    ) {
      setIsFlipped(true);
      console.log("hii from  card");
      // setFlipIndex(-1);
      setTurn("user");
    }
  }, [flipindex, turn, type]);

  // useEffect(() => {
  //   if (
  //     currentInnig === 2 &&
  //     playerOneScore.totalruns < playerTwoScore.totalruns
  //   ) {
  //     determineWinner();
  //   }
  // }, [currentInnig, playerOneScore, playerTwoScore]);

  useEffect(() => {
    if (isInningOver === true) {
      setTimeout(() => {
        setIsFlipped(false);
        setIsInningOver(false);
      }, 100);
    }
  }, [isInningOver]);

  return (
    <div
      className="card-container hover:cursor-pointer hover:scale-95"
      onClick={isFlipped ? (e) => e.preventDefault() : handleCardClick}
    >
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
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
            <div className="text-xs">Matches: {matches}</div>
            <div className="text-xs">Wickets: {wickets}</div>
            <div className="text-xs">Bowl SR: {bowlSR}</div>
            <div className="text-xs">IPL Runs: {iplRuns}</div>
            <div className="text-xs">High Score: {highScore}</div>
            <div className="text-xs">Bat Avg: {batAvg}</div>
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

export default Card;
