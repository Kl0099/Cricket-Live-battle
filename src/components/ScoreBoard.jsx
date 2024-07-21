import React, { useEffect, useState } from "react";

const ScoreBoard = ({
  playerOneScore,
  playerTwoScore,
  totalruns,
  runs,
  totalWickets,
  balls,
  over,
  setIsInningOver,
  isInningOver,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center flex-col space-x-4">
        {playerOneScore === undefined ? null : playerTwoScore ? (
          <p>
            player Two: {playerTwoScore?.totalruns || 0}/
            {playerTwoScore?.totalWickets || 0}
          </p>
        ) : (
          <p>
            player One: {playerOneScore?.totalruns || 0}/
            {playerOneScore?.totalWickets || 0}
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
      <div className="text-center">
        <div className="font-bold text-2xl">
          Player {`${playerTwoScore !== undefined ? "Two" : "One"} `}
          {totalruns}-{totalWickets}
        </div>
        <div className="text-sm bg-purple-600 px-2 py-1 rounded">
          RUN RATE 6.98
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {over.map((item, index) => (
          <div
            key={index}
            className=" flex items-center justify-center rounded-full bg-white text-black h-[50px] w-[50px]"
          >
            <span className=" text-lg">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
