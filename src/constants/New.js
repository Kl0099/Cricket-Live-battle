const batsmanPair = [
  { category: "batsman", name: "AB de Villiers", batting: 88, bowling: 55 },
  { category: "batsman", name: "Chris Gayle", batting: 96, bowling: 53 },
  { category: "batsman", name: "Brendon McCullum", batting: 84, bowling: 55 },
  { category: "batsman", name: "David Warner", batting: 86, bowling: 55 },
  { category: "batsman", name: "Rohit Sharma", batting: 86, bowling: 53 },
  { category: "batsman", name: "Sachin Tendulkar", batting: 96, bowling: 33 },
  { category: "batsman", name: "rahane", batting: 80, bowling: 21 },
  { category: "batsman", name: "David Miller", batting: 85, bowling: 26 },
  { category: "batsman", name: "Suresh Raina", batting: 87, bowling: 21 },
  { category: "batsman", name: "dhoni", batting: 92, bowling: 58 },
  { category: "batsman", name: "finch", batting: 82, bowling: 58 },
  { category: "batsman", name: "Virat Kohli", batting: 96, bowling: 24 },
];
const bowlerPair = [
  { category: "bowler", name: "ashwin", batting: 47, bowling: 82 },
  { category: "bowler", name: "bravo", batting: 72, bowling: 90 },
  { category: "bowler", name: "Yuzvendra Chahal", batting: 35, bowling: 86 },
  { category: "bowler", name: "Jasprit Bumrah", batting: 37, bowling: 90 },
  {
    category: "bowler",
    name: "Mitchell McClenaghan",
    batting: 37,
    bowling: 81,
  },
  { category: "bowler", name: "Lasith Malinga", batting: 34, bowling: 91 },
  { category: "bowler", name: "malinga", batting: 68, bowling: 88 },
  { category: "bowler", name: "Ben Stocks", batting: 70, bowling: 86 },
  { category: "bowler", name: "Zahir Khan", batting: 79, bowling: 85 },
  { category: "bowler", name: "dale stan", batting: 68, bowling: 87 },
  { category: "bowler", name: "narain", batting: 67, bowling: 86 },
  { category: "bowler", name: "nehra", batting: 32, bowling: 81 },
];

shuffle(batsmanPair);
shuffle(bowlerPair);

export const batsmanPair2 = batsmanPair.splice(0, 6);

shuffle(batsmanPair);

export const bowlerpair2 = bowlerPair.splice(0, 6);
shuffle(bowlerPair);

// Array 1: 6 Batsmen
export const batsmanPair1 = batsmanPair.splice(0, 6);

// Array 3: 6 Bowlers
export const bowlerpair1 = bowlerPair.splice(0, 6);

let previous = [
  { category: "bowler", name: "malinga", batting: 68, bowling: 88 },
  { category: "bowler", name: "Ben Stocks", batting: 70, bowling: 86 },
  { category: "bowler", name: "Zahir Khan", batting: 79, bowling: 85 },
  { category: "bowler", name: "dale stan", batting: 68, bowling: 87 },
  { category: "bowler", name: "narain", batting: 67, bowling: 86 },
  { category: "bowler", name: "nehra", batting: 32, bowling: 78 },
];

const rest = bowlerpair1.filter(
  (card) =>
    !previous.some(
      (prevCard) =>
        prevCard.name === card.name && prevCard.category === card.category
    )
);

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  // return array;
}
// console.log(shuffle(batsmanPair2));
// console.log(batsmanPair1);
// console.log(batsmanPair2);
// console.log(shuffle(batsmanPair.splice(0, 6)));
// console.log(shuffle(batsmanPair.splice(0, 6)));
var arr1 = [1, 2, 3, 4],
  arr2 = [2, 4],
  res = arr1.filter((item) => !arr2.includes(item));
// console.log(res);
