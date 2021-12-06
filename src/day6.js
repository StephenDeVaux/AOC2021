const fs = require("fs");
const inputCsv = "./data/day6data.csv";
// const inputCsv = "./data/day6dataTest.csv";

const readCSV = async () => {
  console.log("Day 6");
  const inputData = fs.readFileSync(inputCsv, "utf8").split("\n");

  console.log(inputData);

  let fish = inputData[0].split(",").map((fish) => parseInt(fish));

  console.log("age arra : ");
  console.log(createAgeArray(fish));

  let ageArray = createAgeArray(fish);
  for (let day = 0; day < 256; day++) {
    let numFish = ageArray.shift();
    if (numFish === undefined) continue;
    console.log(numFish);
    ageArray[8] = numFish;
    ageArray[6] = (ageArray[6] === undefined ? 0 : ageArray[6]) + numFish;
  }
  console.log(ageArray);
  console.log('fish in array = ' + countFinalFish(ageArray))
};

module.exports = readCSV;

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

const countFinalFish = (array) => {
  let total = 0;
  array.forEach((num) => {
    total = total + num;
  });
  return total;
};
