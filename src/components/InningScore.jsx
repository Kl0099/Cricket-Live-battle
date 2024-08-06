import React, { useEffect, useState } from "react";
import "../App.css";
import playerImage from "../assets/cricketground.jpg";
const ScoreBoard = ({
  userscore,
  computerscore,
  currentInning,
  currentBattingTurn,
  over,
}) => {
  const Returnscoreboard = () => {
    if (currentInning === 1 && currentBattingTurn === "user") {
      return (
        <div className="font-bold text-2xl">
          {" "}
          user score {`${userscore.totalRun} - ${userscore.totalWickets}`}
        </div>
      );
    }
    if (currentInning === 1 && currentBattingTurn === "computer") {
      return (
        <div className="font-bold text-2xl">
          {" "}
          computer score {computerscore.totalRun} -{computerscore.totalWickets}
        </div>
      );
    }
    if (currentInning === 2) {
      return (
        <>
          <div className="font-bold mb-1 text-2xl">
            {" "}
            user score {`${userscore.totalRun} - ${userscore.totalWickets}`}
          </div>
          <div className="font-bold text-2xl">
            {" "}
            computer score{" "}
            {`${computerscore.totalRun} - ${computerscore.totalWickets}`}
          </div>
        </>
      );
    }
  };
  return (
    <div className="bg-gray-800 border min-h-[100px]  text-white p-4 flex justify-between relative items-center">
      <div className="text-center absolute  left-[45%] ">
        {/* <div className="font-bold text-2xl">
          {currentInning === 1 && currentBattingTurn === "user"
            ? ` userscore  ${userscore.totalRun} - ${userscore.totalWickets}`
            : currentInning === 1 && currentBattingTurn === "computer"
            ? ` computer  ${computerscore.totalRun} - ${computerscore.totalWickets}`
            : ""}
        </div>
        <div className="font-bold text-2xl ml-5">
          {currentInning === 2 && currentBattingTurn === "user"
            ? ` userscore  ${userscore.totalRun} - ${userscore.totalWickets}`
            : currentInning === 2 && currentBattingTurn === "computer"
            ? ` computer  ${computerscore.totalRun} - ${computerscore.totalWickets}`
            : ""}
        </div> */}
        <Returnscoreboard />

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
