import React, { useEffect, useState } from "react";

import {
  batsmanPair1,
  bowlerpair1,
  batsmanPair2,
  bowlerpair2,
} from "../constants/New";
import PerticulerCard from "./PerticulerCard";
import { configureStore } from "@reduxjs/toolkit";
import ScoreBoard from "../components/InningScore";
import backgorundurl from "/background.jpg";
import ConfirmationModal from "../components/Modal";
let initialScoreState = {
  totalruns: 0,
  totalWickets: 0,
  runs: [
    {
      playerName: "",
      run: 0,
      ballNumber: 0,
    },
  ],
  wickets: [
    {
      batsmanName: "",
      bowlerName: "",
      ballNumber: 0,
    },
  ],
  over: [],
  balls: 0,
};
let Totalplayers = {
  User: "John cina",
  Computer: "Computer",
};

const NewPage = () => {
  const [computerIndex, setcomputerIndex] = useState("");
  const [currentBattingTurn, setcurrentBattingTurn] = useState("");
  const [currentTurn, setCurrentTurn] = useState("user");
  const [currentInning, SetcurrentInning] = useState(1);
  //   this backate conitan one card from bowler and one frm batsman
  const [backet, setBacket] = useState([]);
  const [modal, setModal] = useState(true);
  const [over, setOver] = useState([]);
  const [previousPlayers, setPreviousPlayers] = useState([]);
  const [gameOver, setgameOver] = useState(false);
  let [userscore, setuserscore] = useState({
    totalRun: 0,
    totalWickets: 0,
  });
  let [computerscore, setcomputerscore] = useState({
    totalRun: 0,
    totalWickets: 0,
  });
  // useEffect(()=>{
  //   console.log('over :' , over)
  // },[over])

  // useEffect(()=>{
  //   console.log("user score :" ,userscore.totalRun);
  // },[userscore])

  useEffect(() => {
    over.forEach((item) => {
      if (item !== "w") {
        // console.log("item :" , item  , "type :" , typeof item)
        currentBattingTurn === "user"
          ? setuserscore({
              totalRun: userscore.totalRun + item,
              totalWickets: userscore.totalWickets,
            })
          : setcomputerscore({
              totalRun: computerscore.totalRun + item,
              totalWickets: computerscore.totalWickets,
            });
      }
      if (item === "w") {
        currentBattingTurn === "user"
          ? setuserscore({
              totalWickets: userscore.totalWickets + 1,
              totalRun: userscore.totalRun,
            })
          : setcomputerscore({
              totalWickets: computerscore.totalWickets + 1,
              totalRun: computerscore.totalRun,
            });
      }
    });
  }, [over, currentBattingTurn, currentInning]);
  function compareTwoPlayers() {
    // console.log("yes 2");
    // console.log( "backet player :" ,backet)
    let firstCard = [];
    let secondCard = [];
    if (backet[0].category === "batsman") {
      firstCard = backet[0];
      secondCard = backet[1];
    } else {
      firstCard = backet[1];
      secondCard = backet[0];
    }
    // console.log("first card : ", firstCard);
    // console.log("second card : ", secondCard);
    if (firstCard.batting >= secondCard.bowling) {
      let run = firstCard.batting - secondCard.bowling;
      // console.log("rus before selection : ", run);
      if (run > 6) {
        run = 6;
      }
      // console.log("rus after selection : ", run);
      setOver([...over, run]);
      // setuserscore({totalRun : userscore.totalRun+run , totalWickets : userscore.totalWickets});
      setBacket([]);
    } else {
      setOver([...over, "w"]);
      // setuserscore({totalWickets: userscore.totalWickets +1, totalRun : userscore.totalRun});
      setBacket([]);
    }
  }

  useEffect(() => {
    if (backet.length === 2) {
      // setModal(true);
      setTimeout(() => {
        compareTwoPlayers();
      }, 400);
    }
  }, [backet, currentTurn]);

  useEffect(() => {
    if (previousPlayers.length === 12 && over.length === 6) {
      // alert("first inning is over");
      setTimeout(() => {
        SetcurrentInning(2);
        switchinning();
      }, 2000);
    }
  }, [currentInning, over]);
  const switchinning = () => {
    // console.log(over)
    // over.forEach((item) => {
    //   if (item !== "w") {
    //     setuserscore({totalRun : userscore.totalRun+ item , totalWickets : userscore.totalWickets});
    //   }
    //   if (item === "w") {
    //     setuserscore({totalWickets: userscore.totalWickets + 1, totalRun : userscore.totalRun});
    //   }
    // });
    setcurrentBattingTurn(currentBattingTurn === "user" ? "computer" : "user");
    // console.log(userscore.totalRun);
    setOver([]);
  };
  const alertMessage = (message) => {
    // setTimeout(() => {
    alert(message);
    setgameOver(true);
    // }, 2000);
  };
  const winner = () => {
    if (
      currentInning === 2 &&
      over.length > 1 &&
      over.length < 6 &&
      !gameOver
    ) {
      if (
        computerscore.totalRun > userscore.totalRun &&
        currentBattingTurn === "computer"
      ) {
        alertMessage(
          `computer win  by ${10 - computerscore.totalWickets} wickets `
        );
        return;
      }
      if (
        computerscore.totalRun < userscore.totalRun &&
        currentBattingTurn === "user"
      ) {
        alertMessage(`you  win  by ${10 - userscore.totalWickets} wickets `);
        return;
      }
    }
    if (currentInning === 2 && over.length === 6) {
      // console.log("why");
      setTimeout(() => {
        setgameOver(true);
      }, 400);
    }
  };
  useEffect(() => {
    if (
      over.length === 6 &&
      currentInning === 2 &&
      backet.length === 0 &&
      previousPlayers.length === 24 &&
      gameOver
    ) {
      // setTimeout(() => {
      if (computerscore.totalRun < userscore.totalRun) {
        alertMessage(
          `you are win by ${userscore.totalRun - computerscore.totalRun} runs`
        );
      }
      if (userscore.totalRun === computerscore.totalRun) {
        alertMessage("match draw");
      }
      if (computerscore.totalRun > userscore.totalRun) {
        alertMessage(
          `computer win by ${computerscore.totalRun - userscore.totalRun} runs`
        );
      }
      // }, 2000);
      return;
    }
  }, [gameOver, over, setgameOver]);
  useEffect(() => {
    // console.log("hii  this is runnning :")
    setTimeout(() => {
      winner();
    }, 1000);
  }, [
    over,
    currentTurn,
    currentBattingTurn,
    computerscore,
    userscore,
    gameOver,
  ]);

  return (
    <div
      className=" w-full"
      style={{
        backgroundImage: `url(${backgorundurl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ScoreBoard
        currentInning={currentInning}
        userscore={userscore}
        computerscore={computerscore}
        over={over}
        currentBattingTurn={currentBattingTurn}
      />
      <div className="  grid grid-cols-2">
        <div className=" h-screen w-[80%] flex flex-col items-center  mt-10 ml-5  ">
          <PerticulerCard
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
            currentInning={currentInning}
            SetcurrentInning={SetcurrentInning}
            backet={backet}
            setBacket={setBacket}
            players={currentInning === 1 ? batsmanPair1 : batsmanPair2}
            type={"batting"}
            text={"batting side"}
            over={over}
            setOver={setOver}
            previousPlayers={previousPlayers}
            setPreviousPlayers={setPreviousPlayers}
            computerIndex={computerIndex}
            setcomputerIndex={setcomputerIndex}
            currentBattingTurn={currentBattingTurn}
            setcurrentBattingTurn={setcurrentBattingTurn}
          />
        </div>
        <div className=" h-screen w-[80%] flex flex-col items-center mt-10  ml-14">
          <PerticulerCard
            players={currentInning === 1 ? bowlerpair1 : bowlerpair2}
            type={"bowling"}
            text={"bowling side"}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
            currentInning={currentInning}
            SetcurrentInning={SetcurrentInning}
            backet={backet}
            setBacket={setBacket}
            over={over}
            setOver={setOver}
            previousPlayers={previousPlayers}
            setPreviousPlayers={setPreviousPlayers}
            computerIndex={computerIndex}
            setcomputerIndex={setcomputerIndex}
            currentBattingTurn={currentBattingTurn}
            setcurrentBattingTurn={setcurrentBattingTurn}
          />
        </div>
      </div>
      {modal && (
        <ConfirmationModal
          setModal={setModal}
          setcurrentBattingTurn={setcurrentBattingTurn}
          backet={backet}
        />
      )}
    </div>
  );
};

export default NewPage;
