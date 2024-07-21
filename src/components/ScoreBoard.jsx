import React, { useEffect, useState } from "react";
import "../App.css";
import playerImage from "../assets/cricketground.jpg";
const ScoreBoard = ({
  playerOneScore,
  playerTwoScore,
  totalruns,
  runs,
  totalWickets,
  balls,
  over,
  setIsInningOver,
  currentInning,
  isInningOver,
}) => {
  return (
    <div className="bg-gray-800 border min-h-[90px]  text-white p-4 flex justify-between relative items-center">
      <div className="flex items-center flex-col space-x-4">
        {currentInning === 2 && (
          <p>
            player one scored : {playerOneScore?.totalruns} /{" "}
            {playerOneScore?.totalWickets}
          </p>
        )}
        {currentInning === 1 ? (
          <p>
            player One: {totalruns || 0}/{totalWickets || 0}
          </p>
        ) : (
          <p>
            player Two: {totalruns || 0}/{totalWickets || 0}
          </p>
        )}

        {runs.length > 1 && (
          <select className=" px-2 flex flex-col text-black gap-2">
            {runs
              ?.sort((a, b) => a.run - b.run)
              .reverse()
              .map((item, index) => {
                return item.run > 0 ? (
                  <option
                    key={index}
                    className=" mx-2"
                    id="highest player"
                  >
                    {item.playerName} : {item.run} *
                  </option>
                ) : null;
              })}
          </select>
        )}
      </div>
      <div className="text-center absolute  left-[45%] top-[18%]">
        <div className="font-bold text-2xl">
          Player {`${currentInning === 2 ? "Two" : "One"} `}
          {totalruns}-{totalWickets}
        </div>
        <div className="text-sm bg-purple-600 px-2 py-1 rounded">
          RUN RATE 6.98
        </div>
      </div>
      {/* animation */}
      <div className="flex gap-3 ">
        {over.map((item, index) => (
          <div
            key={index}
            className={`right-[-500px]  animated-ball flex items-center justify-center rounded-full ${
              item === "W"
                ? "bg-red-600 text-black"
                : " bg-violet-600 text-white"
            }  text-black h-[50px] w-[50px]`}
          >
            <span className=" text-lg">{item}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 min-w-[335px] ">
        {over.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center rounded-full bg-white text-black h-[50px] w-[50px]`}
          >
            <span className=" text-lg">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
