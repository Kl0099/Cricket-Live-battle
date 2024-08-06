import React, { useEffect, useState } from "react";
import "../App.css"; // Make sure this contains the necessary styles if required
import "../modal.css";
import batsmanbg from "../assets/batsmanbg.jpg";

const ConfirmationModal = ({ backet, setModal, setcurrentBattingTurn }) => {
  const [selectedSide, setSelectedSide] = useState(null);
  const [isTossing, setIsTossing] = useState(false);
  const [result, setResult] = useState(null);
  const [choice, setChoice] = useState(false);
  const [computerchoice, setcomputerChoice] = useState(null);

  const handleToss = () => {
    setIsTossing(true);
    setResult(null);
    setTimeout(() => {
      const tossResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(tossResult);
      setIsTossing(false);
    }, 2000); // 2 seconds for toss animation
  };

  useEffect(() => {
    if (selectedSide === result && selectedSide !== null && result !== null) {
      setChoice(true);
      // document.body.style.pointerEvents = 'none';
      // console.log("yes");
    }
    if (selectedSide !== result && selectedSide !== null && result !== null) {
      setChoice(false);
      document.body.style.pointerEvents = 'none';
      const computerChoice = Math.random() < 0.5 ? "batting" : "bowling";
      setcomputerChoice(computerChoice);
      setcurrentBattingTurn(computerChoice === "batting" ? "computer" : "user");
      setTimeout(() => {
        setModal(false);
        document.body.style.pointerEvents = 'auto';
      }, 2000);
    }
  }, [result, selectedSide]);
  useEffect(() => {
    if (choice === "batting") {
      setcurrentBattingTurn("user");
      setModal(false);
    }
    if (choice === "bowling") {
      setcurrentBattingTurn("computer");
      setModal(false);
    }
  }, [choice, result]);

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto text-white  backdrop-blur-lg  bg-transparent">
      <div
        // style={{
        //   backgroundImage: `url(${batsmanbg})`,
        //   objectFit: "contain",
        // }}
        className="md:w-9/12 h-[600px] rounded-lg bg-slate-300 flex flex-col  items-center bg-cover backdrop-blur-md bg-transparent inset-0  border    gap-4 border-richblack-400 p-2 md:p-6 "
      >
        <h2 className="text-4xl font-bold">Coin Toss</h2>
        <p className=" text-xl mb-2"> click on Heads or Tails</p>
        <div className="flex gap-4">
          <button
            className={`relative w-24 h-24 rounded-full bg-cover bg-center ${selectedSide === "heads"
              ? "border-blue-500 border-4"
              : "border-gray-300 border-2"
              } ${isTossing && selectedSide === "heads" ? "animate-toss-tails" : ""}`}
            style={{ backgroundImage: "url('/Head.jpg')" }}
            onClick={() => {
              setSelectedSide("heads");
              handleToss();
            }}
            disabled={choice === true || isTossing === true}
          ></button>
          <button
            className={`relative w-24 h-24 rounded-full bg-cover bg-center ${selectedSide === "tails"
              ? "border-blue-500 border-4"
              : "border-gray-300 border-2"
              } ${isTossing && selectedSide === "tails" ? "animate-toss-tails" : ""}`}
            style={{ backgroundImage: "url('/Tail.jpg')" }}
            onClick={() => {
              setSelectedSide("tails");
              handleToss();
            }}
            disabled={choice === true || isTossing}
          ></button>
        </div>
        {result && (
          <p className="mt-4 text-xl text-white">
            {result === selectedSide ? "You win!" : "You lose!"} The result is{" "}
            {result}.
          </p>
        )}
        <div
          className={`relative w-24 h-24 mt-4 ${isTossing ? "animate-toss" : " hidden"
            }`}
        >
          {result && !selectedSide && (
            // "bg-[url('/Head.jpg')] bg-cover"
            <div
              className={`absolute inset-0 w-full h-full rounded-full bg-gold flex items-center justify-center text-white font-bold text-2xl ${result === "heads"
                ? "bg-[url('/Head.jpg')] bg-cover"
                : result === "tails"
                  ? "bg-[url('/Tail.jpg')] bg-cover "
                  : ""
                }`}
            ></div>
          )}
          {!result && selectedSide && (
            <div
              className={`absolute inset-0 w-full h-full rounded-full bg-gold flex items-center justify-center text-white font-bold text-2xl 
                ${selectedSide === "heads"
                  ? "bg-[url('/Head.jpg')] bg-cover"
                  : selectedSide === "tails"
                    ? "bg-[url('/Tail.jpg')] bg-cover "
                    : ""
                }
                `}
            ></div>
          )}
        </div>
        {choice === true && (
          <div className="">
            <div className=" flex gap-2">
              <button
                className=" hover:scale-95 p-2 border-white  text-white bg-violet-600 px-5 rounded-lg border-2  "
                onClick={() => setChoice("batting")}
              >
                batting
              </button>
              <button
                className=" hover:scale-95 p-2 border-white  text-black bg-violet-600 px-5 rounded-lg border-2  "
                onClick={() => setChoice("bowling")}
              >
                bowling
              </button>
            </div>
          </div>
        )}
        {computerchoice && (
          <div className=" text-2xl text-white ">
            you loss the toss and computer select {computerchoice} first
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
