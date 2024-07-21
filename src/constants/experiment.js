export const cards = [
  {
    category: "batsman",
    name: "rahane",
    batting: 80,
    bowling: 21,
  },
  {
    category: "batsman",
    name: "David Miller",
    batting: 85,
    bowling: 26,
  },
  {
    category: "batsman",
    name: "Suresh Raina",
    batting: 87,
    bowling: 21,
  },
  {
    category: "batsman",
    name: "dhoni",
    batting: 92,
    bowling: 58,
  },
  {
    category: "batsman",
    name: "finch",
    batting: 82,
    bowling: 58,
  },
  {
    category: "bowler",
    name: "malinga",
    batting: 68,
    bowling: 88,
  },
  {
    category: "bowler",
    name: "Ben Stocks",
    batting: 70,
    bowling: 86,
  },
  {
    category: "bowler",
    name: "Zahir Khan",
    batting: 79,
    bowling: 85,
  },
  {
    category: "bowler",
    name: "dale stan",
    batting: 68,
    bowling: 87,
  },
  {
    category: "bowler",
    name: "narain",
    batting: 67,
    bowling: 86,
  },
  {
    category: "batsman",
    name: "Virat Kohli",
    batting: 96,
    bowling: 24,
  },
  {
    category: "bowler",
    name: "nehra",
    batting: 32,
    bowling: 78,
  },
  {
    category: "batsman",
    name: "AB de Villiers",
    batting: 88,
    bowling: 55,
  },
  {
    category: "batsman",
    name: "Chris Gayle",
    batting: 96,
    bowling: 53,
  },
  {
    category: "batsman",
    name: "Brendon McCullum",
    batting: 84,
    bowling: 55,
  },
  {
    category: "bowler",
    name: "ashwin",
    batting: 47,
    bowling: 82,
  },
  {
    category: "batsman",
    name: "David Warner",
    batting: 86,
    bowling: 55,
  },
  {
    category: "bowler",
    name: "bravo",
    batting: 72,
    bowling: 90,
  },
  {
    category: "bowler",
    name: "Yuzvendra Chahal",
    batting: 35,
    bowling: 86,
  },
  {
    category: "batsman",
    name: "Rohit Sharma",
    batting: 86,
    bowling: 53,
  },
  {
    category: "bowler",
    name: "Jasprit Bumrah",
    batting: 37,
    bowling: 90,
  },
  {
    category: "bowler",
    name: "Mitchell McClenaghan",
    batting: 37,
    bowling: 85,
  },
  {
    category: "bowler",
    name: "Lasith Malinga",
    batting: 34,
    bowling: 91,
  },
  {
    category: "batsman",
    name: "Sachin Tendulkar",
    batting: 96,
    bowling: 33,
  },
];
let allBatsman = [];
allBatsman = cards
  .filter((item) => item.category === "batsman")
  .sort(() => Math.random() - 0.5);
let allBowler = [];
allBowler = cards
  .filter((item) => item.category === "bowler")
  .sort(() => Math.random() - 0.5);

// console.log("allBatsman : ", allBatsman.length);

export const getAllBatsmans = () => {
  const removes = allBatsman.splice(0, 6);
  // console.log(removes.length);
  console.log("this is inuf");
  return removes;
};
// console.log("allBatsman noow : ", allBatsman.length);
export const getAllBowlers = () => {
  const removes = allBowler.splice(0, 6);
  // console.log(removes.length);
  return removes;
};
