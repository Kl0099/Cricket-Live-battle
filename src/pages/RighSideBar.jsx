import React, { useState, useEffect } from "react";

const RightSidebar = () => {
  const [power, setPower] = useState(0); // Power level between 0 and 100
  const [isIncreasing, setIsIncreasing] = useState(true); // Track increasing or decreasing
  const [isRunning, setIsRunning] = useState(false); // Track if the interval is running
  const [blueHeight, setBlueHeight] = useState(2); // Height of blue div
  const [bluBarPossision, setBluBarPossision] = useState(
    Math.floor(Math.random() * 70 + 5)
  );

  useEffect(() => {
    // Set a random height for the blue div between 20px and 100px on component mount
    setBlueHeight(Math.floor(Math.random() * 5) + 5);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setPower((prevPower) => {
          if (prevPower >= 100) {
            setIsIncreasing(false);
            return prevPower - 2;
          } else if (prevPower <= 0) {
            setIsIncreasing(true);
            return prevPower + 2;
          } else {
            return isIncreasing ? prevPower + 2 : prevPower - 2;
          }
        });
      }, 25);
    } else if (!isRunning) {
      setTimeout(() => {
        clearInterval(interval);
      }, 500); // Wait 100ms before stopping completely
    }
    return () => clearInterval(interval);
  }, [isRunning, isIncreasing]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white p-4 rounded shadow-lg w-20">
      <div className="mb-4">
        <p className="text-center text-xs font-semibold">Power Meter</p>
        <div className="relative h-40 w-10 bg-gray-300 rounded mx-auto">
          <div className="absolute h-[13px] top-[10px] transform -translate-y-1/2 w-full  bg-red-800"></div>
          <div
            className="absolute z-10 bottom-0 w-full border-t border-black"
            style={{ height: `${power}%` }}
          ></div>

          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-full bg-blue-500"
            style={{
              height: `${blueHeight}px`,
              top: `${bluBarPossision}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-center text-xs font-semibold">Control</p>
        <button
          onClick={handleStartStop}
          className={`w-full ${
            isRunning ? "bg-red-500" : "bg-blue-500"
          } text-white py-1 rounded mb-1`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
