import {
  strongBatsman,
  strongBowler,
  weakBatsman,
  weakBowler,
} from "./example.js";

const bowlinggType = {
  fastBowl: "fast bowl",
  slowBowl: "slower bowl",
  bouncer: "bouncer",
  slowerBouncer: "slower bouncer",
  yorker: "yorker",
};

export function getBallOutcome(batsman, bowler, bowlingType, ballCount) {
  // Adjust bowler's and batsman's performance based on fatigue
  const bowlerFatigueFactor =
    1 - (bowler.weaknesses.fatigueFactor / 100) * (ballCount / 6);
  const batsmanFatigueFactor =
    1 - (batsman.weaknesses.fatigueFactor / 100) * (ballCount / 6);

  // Calculate effectiveness of the ball based on bowler's strengths
  let ballEffectiveness;
  switch (bowlingType) {
    case bowlinggType.fastBowl:
      ballEffectiveness = bowler.strengths.speed * bowlerFatigueFactor;
      break;
    case bowlinggType.slowBowl:
      ballEffectiveness =
        ((bowler.strengths.accuracy + bowler.strengths.swing) *
          bowlerFatigueFactor) /
        2;
      break;
    case bowlinggType.bouncer:
      ballEffectiveness = bowler.strengths.speed * bowlerFatigueFactor * 0.8;
      break;
    case bowlinggType.slowerBouncer:
      ballEffectiveness =
        (((bowler.strengths.accuracy + bowler.strengths.swing) *
          bowlerFatigueFactor) /
          2) *
        0.8;
      break;
    case bowlinggType.yorker:
      ballEffectiveness = bowler.strengths.yorker * bowlerFatigueFactor;
      break;
    default:
      ballEffectiveness = 50;
  }

  // Adjust for no-ball and wide probabilities
  if (Math.random() * 100 < bowler.weaknesses.noBallProbability)
    return "no-ball";
  if (Math.random() * 100 < bowler.weaknesses.wideBallProbability)
    return "wide";

  // Calculate batsman's effectiveness against the ball type
  const batsmanEffectiveness = batsman.strengths.timing * batsmanFatigueFactor;

  // Determine outcome based on relative effectiveness
  const outcomeProbability = batsmanEffectiveness / ballEffectiveness;

  if (outcomeProbability > 2) {
    return Math.random() < 0.5 ? 4 : 6;
  } else if (outcomeProbability > 1.5) {
    return 3;
  } else if (outcomeProbability > 1) {
    return Math.random() < 0.5 ? 1 : 2;
  } else if (outcomeProbability > 0.5) {
    return 0;
  } else {
    return "wicket";
  }
}

// Example usage
const batsman = {
  name: "Batsman Name",
  type: "Right-handed",
  strengths: {
    technique: 80,
    power: 90,
    footwork: 80,
    timing: 90,
  },
  weaknesses: {
    shortBall: 10,
    spin: 20,
    fatigueFactor: 40,
  },
  specialAbilities: ["Sweep Shot", "Lofted Drive"],
};

const bowler = {
  name: "Bowler Name",
  type: "Fast",
  strengths: {
    speed: 10,
    accuracy: 30,
    swing: 15,
    yorker: 30,
  },
  weaknesses: {
    noBallProbability: 10,
    wideBallProbability: 5,
    fatigueFactor: 15,
  },
  specialAbilities: ["Reverse Swing", "Bouncer"],
};

const ballOutcome = getBallOutcome(
  weakBatsman,
  strongBowler,
  bowlinggType.bouncer,
  1
);
console.log(ballOutcome);
