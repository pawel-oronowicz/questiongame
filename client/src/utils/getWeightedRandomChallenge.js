function getWeightedRandomChallenge(challenges) {
  const weightedList = [];

  challenges.forEach(challenge => {
    for (let i = 0; i < challenge.weight; i++) {
      weightedList.push(challenge);
    }
  });

  const randomIndex = Math.floor(Math.random() * weightedList.length);
  return weightedList[randomIndex];
}

  export default getWeightedRandomChallenge;