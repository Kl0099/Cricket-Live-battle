// import IconBtn from "./IconBtn";
import React from "react";

import playerImage from "../assets/cricketground.jpg";
import "../App.css";

const ConfirmationModal = ({ backet }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto text-black bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="md:w-11/12  rounded-lg flex gap-2  border-richblack-400 p-2  md:p-6">
        {backet.map((item, index) => (
          <div
            key={index}
            className="card-container hover:cursor-pointer hover:scale-95"
            // onClick={handleCardClick}
          >
            <div className={`card is-flipped`}>
              <div
                className="card-front"
                style={{ backgroundImage: `url(${playerImage})` }}
              ></div>
              <div className="card-back p-2 text-white">
                <div className="text-center">
                  <div className="text-lg font-bold">{item.name}</div>
                  <div className="text-sm">{item.category}</div>
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
                      <div className="text-lg font-bold">{item.bowling}</div>
                      <div className="text-xs">Bowling</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">{item.batting}</div>
                      <div className="text-xs">Batting</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmationModal;
