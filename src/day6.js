const { Console } = require("console");
const fs = require("fs");
const { Agent } = require("http");
const inputCsv = "./data/day6data.csv";
// const inputCsv = "./data/day6dataTest.csv";

const readCSV = async () => {
  console.log("Day 6");
  const inputData = fs.readFileSync(inputCsv, "utf8").split("\n");

  console.log(inputData);

  let fish = inputData[0].split(",").map((fish) => parseInt(fish));
  console.log(fish);

  // let notCountedFish = [];

  // for (let i = 0; i < fish.length; i++) {}

  console.log("age arra : ");
  console.log(createAgeArray(fish));

  let ageArray = createAgeArray(fish);
  let countedFish = 0;
  for (let day = 0; day < 256; day++) {
    let numFish = ageArray.shift();
    if (numFish === undefined) continue;
    console.log(numFish);
    ageArray[8] = numFish;
    ageArray[6] = (ageArray[6] === undefined ? 0 : ageArray[6]) + numFish;
    countedFish = countedFish + numFish;
  }
  console.log(ageArray);
  console.log(countedFish);
  console.log('fish in array = ' + countFinalFish(ageArray))
  // console.log('total fish = ' + (countedFish + countFinalFish(ageArray)))
  // console.log('total fish = ' + (countedFish + countFinalFish(ageArray)))
};

module.exports = readCSV;

const dayOfLife = (fishes) => {
  let babyFish = [];
  let olderFish = fishes.map((fish) => {
    if (fish === 0) {
      babyFish.push(8);
      return 6;
    }
    return fish - 1;
  });

  return [...olderFish, ...babyFish];
};

const numBabys = (fishAge, days) => {
  let babes = Math.ceil((days - fishAge) / 7);
  return babes > 0 ? babes : 0;
};

const babiesBabies = (numBabys, days) => {};

const createAgeArray = (fishes) => {
  let ageArray = [];
  fishes.forEach((fishAge) => {
    if (ageArray[fishAge] === undefined) {
      ageArray[fishAge] = 1;
    } else {
      ageArray[fishAge] = ageArray[fishAge] + 1;
    }
  });
  return ageArray;
};

const ageOneDay = (ageArray) => {
  let numFish = ageArray.shift();
  ageArray[9] = numFish;

  return {
    ageArray: ageArray,
    countedFish: numFish,
  };
};

const countFinalFish = (array) => {
  let total = 0;
  array.forEach((num) => {
    total = total + num;
  });
  return total;
};
