import React, { useEffect, useState } from "react";
import { getAllBatsmans, getAllBowlers } from "../constants/experiment";
import Card from "../components/card";
import ScoreBoard from "../components/ScoreBoard";
import { useNavigate } from "react-router-dom";
import InningScore from "../components/InningScore";
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
let playerOneScore;
let playerTwoScore;
let batsmanscard = getAllBatsmans();
let bowlerscard = getAllBowlers();
let batsmanscard2 = getAllBatsmans();
let bowlerscard2 = getAllBowlers();
const Home = () => {
  const [isInningOver, setIsInningOver] = useState(false);
  const [oldPlayers, setoldPlayers] = useState([]);
  const [score, setScore] = useState(initialScoreState);
  const [players, setPlayers] = useState([]);
  const [inning, setInning] = useState(1);
  const [turn, setTurn] = useState("user");
  const [flipindex, setFlipIndex] = useState(-1);
  const [previes, setPreviousies] = useState([]);

  const navigate = useNavigate();
  const switchInning = () => {
    if (inning === 1) {
      playerOneScore = score;
      localStorage.setItem("playerOneScore", JSON.stringify(playerOneScore));
      console.log("hiii");
      setPlayers([]);
      setTimeout(() => {
        setIsInningOver(true);
      }, 400);
      setTimeout(() => {
        alert(
          `first inning is over and score is ${
            playerOneScore.totalruns + " - " + playerOneScore.totalWickets
          }`
        );
      }, 1600);
      setTimeout(() => {
        setInning(2);
        setScore(initialScoreState);
      }, 1500);

      // console.log("bye");
    } else {
      setTimeout(() => {
        alert(`player Two wins by ${10 - score.totalWickets} Wickets`);
      }, 1700);
      // Add logic to determine the winner
      determineWinner();
    }
  };

  const selectPlayer = (index, category) => {
    if (inning === 1) {
      const selectedPlayer =
        category === "batsman"
          ? batsmanscard.filter((card, idx) => idx === index)
          : bowlerscard.filter((card, idx) => idx === index);

      setPlayers([...players, selectedPlayer[0]]);
      setPreviousies([...previes, selectedPlayer[0]]);
      // setFlipIndex(bowlerscard[bowlerscard.length - 1].name);
    } else {
      const selectedPlayer =
        category === "batsman"
          ? batsmanscard2.filter((card, idx) => idx === index)
          : bowlerscard2.filter((card, idx) => idx === index);
      setPlayers([...players, selectedPlayer[0]]);
      setPreviousies([...previes, selectedPlayer[0]]);
    }
  };

  const computerSelection = (result) => {
    setPlayers([...players, result]);
    // setPreviousies([...previes, result]);
    setPreviousies([...previes, result]);
    return true;
  };

  useEffect(() => {
    // console.log(players);
    if (players.length === 2) {
      const batsman = players.filter(
        (player) => player.category === "batsman"
      )[0];
      const bowler = players.filter(
        (player) => player.category === "bowler"
      )[0];
      setoldPlayers([...oldPlayers, batsman, bowler]);
      // console.log("batsman : ", batsman);
      // console.log("bowler : ", bowler);
      if (batsman.batting > bowler.bowling) {
        const runs =
          batsman.batting - bowler.bowling >= 6
            ? 6
            : batsman.batting - bowler.bowling;
        setScore({
          ...score,
          totalruns: score.totalruns + runs,
          runs: [
            ...score.runs,
            {
              playerName: batsman.name,
              run: runs,
              ballNumber: score.balls + 1,
            },
          ],
          balls: score.balls + 1,
          over: [...score.over, runs],
        });
        if (inning === 2) {
          playerTwoScore = score;
        }
        setPlayers([]);
      } else {
        setScore({
          ...score,
          wickets: [
            ...score.wickets,
            {
              batsmanName: batsman.name,
              bowlerName: bowler.name,
              ballNumber: score.balls + 1,
            },
          ],
          over: [...score.over, "W"],
          balls: score.balls + 1,
          totalWickets: score.totalWickets + 1,
        });
        if (inning === 2) {
          playerTwoScore = score;
        }
        setPlayers([]);
      }
    }
  }, [players]);
  // useEffect(() => {
  //   if (inning === 2 && oldPlayers.length !== 24) {
  //     if (
  //       playerOneScore.totalruns < score.totalruns &&
  //       oldPlayers.length >= 14
  //     ) {
  //       setTimeout(() => {
  //         alert(`player Two wins by ${10 - score.totalWickets} Wickets`);
  //       }, 1700);
  //     }
  //   }
  // }, [inning, playerOneScore, score, oldPlayers]);
  useEffect(() => {
    if (oldPlayers.length === 12) {
      console.log("old player length is 12");
      setTimeout(switchInning(), 100);
    } else if (oldPlayers.length === 24) {
      setTimeout(determineWinner(), 1600);
    }
  }, [oldPlayers]);
  const determineWinner = () => {
    playerTwoScore = score;
    localStorage.setItem("playerTwoScore", JSON.stringify(playerTwoScore));
    if (playerOneScore.totalruns > playerTwoScore.totalruns) {
      setTimeout(() => {
        alert(
          `Player One wins by ${
            playerOneScore.totalruns - playerTwoScore.totalruns
          } runs`
        );
      }, 1500);
    } else if (playerOneScore.totalruns < playerTwoScore.totalruns) {
      setTimeout(() => {
        alert(
          `Player Two wins by ${
            playerTwoScore.totalruns - playerOneScore.totalruns
          } runs`
        );
      }, 1500);
    } else {
      setTimeout(() => {
        alert("match Draw");
      }, 1500);
    }
    // navigate("/inningscore");
    return;
    // window.location.reload();
  };

  return (
    <div className=" w-full">
      <ScoreBoard
        playerOneScore={playerOneScore}
        playerTwoScore={playerTwoScore}
        totalruns={score.totalruns || 0}
        runs={score.runs}
        totalWickets={score.totalWickets}
        balls={score.balls}
        over={score.over}
        setIsInningOver={setIsInningOver}
        isInningOver={isInningOver}
        currentInning={inning}
      />

      {/* <main>
        <p>runs : {score.runs}</p>
        <p>wickets : {score.wickets}</p>
      </main> */}
      <div className=" grid grid-cols-2">
        <div className=" h-screen w-full border ">
          {/* batting card :) */}
          <Cards
            text={"Batting side : "}
            score={score}
            type={"batsman"}
            innnig={inning === 1 ? batsmanscard : batsmanscard2}
            selectPlayer={selectPlayer}
            setIsInningOver={setIsInningOver}
            isInningOver={isInningOver}
            determineWinner={determineWinner}
            currentInnig={inning}
            turn={turn}
            setTurn={setTurn}
            flipindex={flipindex}
            setFlipIndex={setFlipIndex}
            previes={previes}
            setPreviousies={setPreviousies}
            computerSelection={computerSelection}
            players={players}
            innings={inning}
            oldPlayers={oldPlayers}
            setInning={setInning}
          />
        </div>
        <div className=" h-screen w-full border ">
          {/* bowling card :) */}
          <Cards
            text={"Bowling side : "}
            type={"bowler"}
            score={score}
            innnig={inning === 1 ? bowlerscard : bowlerscard2}
            selectPlayer={selectPlayer}
            setIsInningOver={setIsInningOver}
            isInningOver={isInningOver}
            determineWinner={determineWinner}
            currentInnig={inning}
            turn={turn}
            setTurn={setTurn}
            flipindex={flipindex}
            setFlipIndex={setFlipIndex}
            previes={previes}
            setPreviousies={setPreviousies}
            computerSelection={computerSelection}
            players={players}
            // innings={inning}
            setInning={setInning}
            oldPlayers={oldPlayers}
          />
        </div>
      </div>
    </div>
  );
};

function Cards({
  innnig,
  type,
  selectPlayer,
  setIsInningOver,
  determineWinner,
  isInningOver,
  currentInnig,
  score,
  text,
  turn,
  setTurn,
  flipindex,
  setFlipIndex,
  previes,
  setPreviousies,
  setInning,
  computerSelection,
  players,
  oldPlayers,
  // innings,
}) {
  useEffect(() => {
    // console.log("hii");
    console.log("oldplayer : ", oldPlayers.length);
    if (oldPlayers.length === 12) {
      console.log("turn over");
    }
    if (turn === "computer") {
      if (currentInnig === 1 && type === "bowler") {
        // console.log("vopdfmd");
        let result = innnig.filter((item) => !previes.includes(item));
        // console.log("reuslt : ", result.length);
        if (result.length === 0) {
          // setIsInningOver(true);
          // setInning(2);
          return;
        }
        // console.log(result[result.length - 1]);
        setFlipIndex(result[result.length - 1].name);
        let res = computerSelection(result[result.length - 1]);
      } else if (currentInnig === 2 && type === "batsman") {
        // console.log("vopdfmd");
        let result = innnig.filter((item) => !previes.includes(item));
        // console.log("reuslt : ", result.length);
        if (result.length === 0) {
          setIsInningOver(true);
          return;
        }
        // console.log(result[result.length - 1]);
        setFlipIndex(result[result.length - 1].name);
        let res = computerSelection(result[result.length - 1]);
      }
      // console.log(flipindex);
    }
  }, [turn, type, flipindex, currentInnig, oldPlayers]);
  return (
    <>
      <h1>{text}</h1>
      <div className="flex flex-wrap items-center">
        {innnig.map((card, index) => {
          return (
            <Card
              innings={currentInnig}
              turn={turn}
              setTurn={setTurn}
              flipindex={flipindex}
              setFlipIndex={setFlipIndex}
              previes={previes}
              setPreviousies={setPreviousies}
              type={type}
              key={index}
              name={card.name}
              batting={card.batting}
              bowling={card.bowling}
              category={card.category}
              index={index}
              selectPlayer={selectPlayer}
              matches={0}
              wickets={0}
              bowlSR={0}
              iplRuns={0}
              highScore={0}
              batAvg={0}
              setIsInningOver={setIsInningOver}
              isInningOver={isInningOver}
              determineWinner={determineWinner}
              currentInning={currentInnig}
              score={score}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
