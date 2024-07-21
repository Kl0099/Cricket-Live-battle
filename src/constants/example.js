export const strongBatsman = {
  name: "Strong Batsman",
  type: "Right-handed",
  strengths: {
    technique: 90,
    power: 90,
    footwork: 85,
    timing: 90,
  },
  weaknesses: {
    shortBall: 5,
    spin: 10,
    fatigueFactor: 5,
  },
  specialAbilities: ["Sweep Shot", "Lofted Drive"],
};

export const strongBowler = {
  name: "Strong Bowler",
  type: "Fast",
  strengths: {
    speed: 90,
    accuracy: 90,
    swing: 85,
    yorker: 90,
  },
  weaknesses: {
    noBallProbability: 5,
    wideBallProbability: 5,
    fatigueFactor: 5,
  },
  specialAbilities: ["Reverse Swing", "Bouncer"],
};

export const weakBowler = {
  name: "Weak Bowler",
  type: "Fast",
  strengths: {
    speed: 60,
    accuracy: 65,
    swing: 55,
    yorker: 60,
  },
  weaknesses: {
    noBallProbability: 20,
    wideBallProbability: 15,
    fatigueFactor: 20,
  },
  specialAbilities: ["Reverse Swing", "Bouncer"],
};
export const moderateBatsman = {
  name: "Moderate Batsman",
  type: "Right-handed",
  strengths: {
    technique: 70,
    power: 70,
    footwork: 65,
    timing: 70,
  },
  weaknesses: {
    shortBall: 15,
    spin: 20,
    fatigueFactor: 10,
  },
  specialAbilities: ["Sweep Shot", "Lofted Drive"],
};

export const weakBatsman = {
  name: "Weak Batsman",
  type: "Right-handed",
  strengths: {
    technique: 50,
    power: 50,
    footwork: 45,
    timing: 50,
  },
  weaknesses: {
    shortBall: 25,
    spin: 30,
    fatigueFactor: 20,
  },
  specialAbilities: ["Sweep Shot", "Lofted Drive"],
};

export const cards = [
  {
    category: "batsman",
    name: "Virat kohli",
    batting: "98",
    bowling: "30",
  },
  { category: "batsman", name: "rohit sharma", batting: "96", bowling: "40" },
  { category: "bowler", name: "jasprit bumrah", batting: "30", bowling: "97" },
  {
    category: "batsman",
    name: "surya yadav",
    batting: "87",
    bowling: "10",
  },
  { category: "batsman", name: "travis head", batting: "95", bowling: "20" },
  { category: "batsman", name: "david warner", batting: "93", bowling: "10" },
  { category: "bowler", name: "pat cummis", batting: "70", bowling: "85" },
  { category: "bowler", name: "mitchel starc", batting: "40", bowling: "97" },
  { category: "bowler", name: "addm jampa", batting: "30", bowling: "89" },
  {
    category: "batsman",
    name: "kane williamson",
    batting: "92",
    bowling: "20",
  },
  { category: "bowler", name: "kagiso rabada", batting: "40", bowling: "89" },
  { category: "batsman", name: "glen maxwell", batting: "90", bowling: "55" },
  { category: "bowler", name: "rashid khan", batting: "60", bowling: "90" },
  { category: "batsman", name: "babar azam", batting: "87", bowling: "10" },
  { category: "bowler", name: "nashim shah", batting: "20", bowling: "82" },
  { category: "bowler", name: "mohhmad siraj", batting: "20", bowling: "85" },
];

console.log(
  "batsman :",
  cards.filter((item) => item.category === "batsman").length
);
console.log(
  "bowler :",
  cards.filter((item) => item.category === "bowler").length
);
