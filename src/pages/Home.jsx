import React, { useEffect, useState } from "react";
import { getAllBatsmans, getAllBowlers } from "../constants/experiment";
import Card from "../components/card";
import ScoreBoard from "../components/ScoreBoard";
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
const Home = () => {
  const [isInningOver, setIsInningOver] = useState(false);
  const [oldPlayers, setoldPlayers] = useState([]);
  const [score, setScore] = useState(initialScoreState);
  const [players, setPlayers] = useState([]);
  const selectPlayer = (index, category) => {
    const selectedplayer =
      category === "batsman"
        ? batsmanscard.filter((card, idx) => idx === index)
        : bowlerscard.filter((card, idx) => idx === index);
    // console.log(selectedplayer);

    setPlayers([...players, selectedplayer[0]]);
  };

  useEffect(() => {
    console.log("batsmane  : ", batsmanscard);
  }, [batsmanscard]);

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
        const runs = batsman.batting - bowler.bowling;
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
        setPlayers([]);
      }
    }
  }, [players]);
  const afterInnings = (type) => {
    if (type === "first") {
      alert("game over");
      playerOneScore = score;
      // console.log(playerOneScore);
      localStorage.setItem("playerOneScore", playerOneScore);
      setScore(initialScoreState);
      setIsInningOver(true);
      // return;
      // console.log(batsmanscard);
    } else {
      playerTwoScore = score;
      if (playerOneScore.totalruns > playerTwoScore.totalruns) {
        alert(
          `playerOne is win by ${10 - playerOneScore.totalWickets} wickets`
        );
        window.location.reload();
      } else if (playerOneScore.totalruns < playerTwoScore.totalruns) {
        alert(
          `playerTwo is win by ${
            playerOneScore.totalruns - playerTwoScore.totalruns
          } runs`
        );
        window.location.reload();
      } else {
        alert("match draw");
      }
    }
  };
  useEffect(() => {
    if (oldPlayers.length === 12) {
      afterInnings("first");
    } else if (oldPlayers.length === 24) {
      // alert("game over");

      afterInnings("second");
      // console.log(playerOneScore);
    }
  }, [oldPlayers]);
  return (
    <div className=" w-full">
      <ScoreBoard
        playerOneScore={playerOneScore}
        playerTwoScore={playerTwoScore}
        over={score.over}
        balls={score.balls}
        totalruns={score.totalruns}
        totalWickets={score.totalWickets}
        runs={score.runs}
        setIsInningOver={setIsInningOver}
        isInningOver={isInningOver}
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
            {batsmanscard.map((card, index) => {
              return (
                <Card
                  type={"batsman"}
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
                />
              );
            })}
          </div>
        </div>
        <div className=" h-screen w-full border ">
          <h1>bowling side : </h1>

          <div
            className="flex flex-wrap items-center
         "
          >
            {bowlerscard.map((card, index) => {
              return (
                <Card
                  type={"bowler"}
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
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
