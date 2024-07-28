import React, { useEffect, useState } from "react";
import "../App.css";
import playerImage from "../assets/cricketground.jpg";
const NewScoreboard = ({}) => {
  return (
    <div className="bg-gray-800 border min-h-[90px]  text-white p-4 flex justify-between relative items-center">
      <div className="flex items-center flex-col space-x-4"></div>
      <div className="text-center absolute  left-[45%] top-[18%]"></div>
      {/* animation */}
      <div className="flex gap-3 "></div>
      <div className="flex gap-2 min-w-[335px] "></div>
    </div>
  );
};

export default NewScoreboard;
