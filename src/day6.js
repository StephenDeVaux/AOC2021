const { Console } = require("console");
const fs = require("fs");
// const inputCsv = "./data/day6data.csv";
const inputCsv = "./data/day6dataTest.csv";

const readCSV = async () => {
  console.log("Day 6");
  const inputData = fs.readFileSync(inputCsv, "utf8").split("\n");

  console.log(inputData)

  let fish = inputData[0].split(',').map(fish => parseInt(fish))
  console.log(fish)

  for(let day = 0; day < 256; day++){
    fish = dayOfLife(fish)
  }
  console.log(fish.length)
};

module.exports = readCSV;

const dayOfLife = (fishes) => {
  let babyFish = []
  let olderFish = fishes.map( fish => { 
    if (fish === 0) {
      babyFish.push(8)
      return 6
    }
    return (fish - 1)
  })

  return [ ...olderFish, ...babyFish ]
}