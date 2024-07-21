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
  const [currentPlayer, setCurrentPlayer] = useState("batting");
  const navigate = useNavigate();
  const switchInning = () => {
    if (inning === 1) {
      playerOneScore = score;
      localStorage.setItem("playerOneScore", JSON.stringify(playerOneScore));
      alert(
        `first inning is over and score is ${
          playerOneScore.totalruns + " - " + playerOneScore.totalWickets
        }`
      );
      setInning(2);
      setCurrentPlayer("bowling");
      // Reset players for bowling side
      setPlayers([]);
      setScore(initialScoreState);
      setIsInningOver(true);
    } else {
      alert("Game Over");
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
    } else {
      const selectedPlayer =
        category === "batsman"
          ? batsmanscard2.filter((card, idx) => idx === index)
          : bowlerscard2.filter((card, idx) => idx === index);
      setPlayers([...players, selectedPlayer[0]]);
    }
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
  useEffect(() => {
    if (oldPlayers.length === 12) {
      switchInning();
    } else if (oldPlayers.length === 24) {
      determineWinner();
    }
  }, [oldPlayers]);
  const determineWinner = () => {
    playerTwoScore = score;
    localStorage.setItem("playerTwoScore", JSON.stringify(playerTwoScore));
    if (playerOneScore.totalruns > playerTwoScore.totalruns) {
      alert(
        `Player One wins by ${
          playerOneScore.totalruns - playerTwoScore.totalruns
        } runs`
      );
    } else if (playerOneScore.totalruns < playerTwoScore.totalruns) {
      alert(
        `Player Two wins by ${
          playerTwoScore.totalruns - playerOneScore.totalruns
        } runs`
      );
    } else {
      alert("Match Draw");
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
          <h1>batting side : </h1>
          <div
            className=" flex flex-wrap
         "
          >
            <Cards
              type={"batsman"}
              innnig={inning === 1 ? batsmanscard : batsmanscard2}
              selectPlayer={selectPlayer}
              setIsInningOver={setIsInningOver}
              isInningOver={isInningOver}
              determineWinner={determineWinner}
              currentInnig={inning}
            />
          </div>
        </div>
        <div className=" h-screen w-full border ">
          <h1>bowling side : </h1>

          <div
            className="flex flex-wrap items-center
         "
          >
            <Cards
              type={"bowler"}
              innnig={inning === 1 ? bowlerscard : bowlerscard2}
              selectPlayer={selectPlayer}
              setIsInningOver={setIsInningOver}
              isInningOver={isInningOver}
              determineWinner={determineWinner}
              currentInnig={inning}
            />
          </div>
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
}) {
  return innnig.map((card, index) => {
    return (
      <Card
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
      />
    );
  });
}

export default Home;
