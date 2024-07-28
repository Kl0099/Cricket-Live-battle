import React, { useEffect, useState } from "react";
import "../App.css";
import playerImage from "../assets/cricketground.jpg";
const ScoreBoard = ({userscore,
  computerscore,
  over
}) => {
  return (
    <div className="bg-gray-800 border min-h-[100px]  text-white p-4 flex justify-between relative items-center">
     
      <div className="text-center absolute  left-[45%] ">
        <div className="font-bold text-2xl">
          your score : {userscore.totalRun} - {userscore.totalWickets}
        </div>
        <div className="font-bold text-2xl ml-5">
          computer score : {computerscore.totalRun} - {computerscore.totalWickets}
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
