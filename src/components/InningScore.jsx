import React, { useEffect } from "react";

const InningScore = () => {
  let playerOneScore;
  let playerTwoScore;
  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("playerOneScore"));

    console.log("player one : ", value);

    console.log(
      "player two : ",
      JSON.parse(localStorage.getItem("playerTwoScore"))
    );
  }, [playerOneScore, playerTwoScore]);
  console.log("hii");
  return (
    <div className=" absolute z-10 w-full h-full bg-transparent">
      <h1>inning score</h1>
    </div>
  );
};

export default InningScore;
