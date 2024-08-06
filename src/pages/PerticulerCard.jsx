import React, { useEffect, useState } from "react";
import NewCard from "../components/NewCard";
let Totalplayers = {
  User: "John cina",
  Computer: "Computer",
};

function filterArray(bigArray, smallArray) {
  return bigArray.filter(
    (item) =>
      !smallArray.some(
        (smallItem) =>
          smallItem.name === item.name && smallItem.category === item.category
      )
  );
}

const PerticulerCard = ({
  text,
  type,
  players,
  currentTurn,
  setCurrentTurn,
  currentInning,
  SetcurrentInning,
  backet,
  setBacket,
  over,
  setOver,
  previousPlayers,
  setPreviousPlayers,
  computerIndex,
  setcomputerIndex,
  currentBattingTurn,
  setcurrentBattingTurn,
}) => {
  const computerSelection = () => {
    // console.log("players :", players);
    let restCard = filterArray(players, previousPlayers);
    if (restCard.length === 0) {
      return;
    }

    let rendomCard = restCard[restCard.length - 1];
    // console.log("rendom : " , rendomCard)
    // console.log("previous players :", previousPlayers);
    // console.log("random card", rendomCard);
    setBacket([
      ...backet,
      {
        name: rendomCard.name,
        category: rendomCard.category,
        batting: rendomCard.batting,
        bowling: rendomCard.bowling,
      },
    ]);
    setPreviousPlayers([
      ...previousPlayers,
      {
        name: rendomCard.name,
        category: rendomCard.category,
        batting: rendomCard.batting,
        bowling: rendomCard.bowling,
      },
    ]);

    setcomputerIndex(rendomCard.name);
  };
  useEffect(() => {
    if (currentTurn === "computer") {
      if (
        (type === "bowling" && currentBattingTurn === "user") ||
        (type === "batting" && currentBattingTurn === "computer")
      ) {
        // setTimeout(computerSelection(), 5000);
        computerSelection();
        return;
      }
    }
  }, [currentTurn, currentBattingTurn]);

  return (
    <>
      <h1>{text}</h1>

      <div
        onClick={(e) => e.preventDefault()}
        className="flex flex-wrap w-full justify-center  "
      >
        {players.map((card, index) => {
          return (
            <NewCard
              computerCardIndex={computerIndex}
              setcomputerIndex={setcomputerIndex}
              key={index}
              batting={card.batting}
              bowling={card.bowling}
              name={card.name}
              category={card.category}
              currentTurn={currentTurn}
              setCurrentTurn={setCurrentTurn}
              currentInning={currentInning}
              SetcurrentInning={SetcurrentInning}
              backet={backet}
              over={over}
              setOver={setOver}
              previousPlayers={previousPlayers}
              setPreviousPlayers={setPreviousPlayers}
              setBacket={setBacket}
              type={type}
              currentBattingTurn={currentBattingTurn}
              setcurrentBattingTurn={setcurrentBattingTurn}
            />
          );
        })}
      </div>
    </>
  );
};

export default PerticulerCard;
