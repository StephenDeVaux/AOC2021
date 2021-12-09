const fs = require("fs");
const inputCsv = "./data/day7data.csv";
// const inputCsv = "./data/day7dataTest.csv";

const readCSV = async () => {
  console.log("Day 7");
  const inputData = fs
    .readFileSync(inputCsv, "utf8")
    .split(",")
    .map((num) => parseInt(num));

  let min = Math.min(...inputData);
  let max = Math.max(...inputData);
  

  //  Part 1
  let lowestFuelCost = "";
  for (let i = min; i < max; i++) {
    let fuelCost = inputData.reduce((sum, crab) => {
      return Math.abs(crab - i) + sum;
    }, 0);
    if (lowestFuelCost === "") lowestFuelCost = fuelCost;
    if (fuelCost < lowestFuelCost) lowestFuelCost = fuelCost;
  }
  // console.log(' Part 1 lowest fuel = ' + lowestFuelCost);
  
  
  //  Part 2
  let lowestFuelCost2 = "";
  for (let i = min; i < max; i++) {
    let fuelCost = inputData.reduce((sum, crab) => {
      let dist = Math.abs(crab - i)
      return (dist * (dist + 1) / 2) + sum;
    }, 0);
    if (lowestFuelCost2 === "") lowestFuelCost2 = fuelCost;
    if (fuelCost < lowestFuelCost2) lowestFuelCost2 = fuelCost;
  }
  console.log(' Part 2 lowest fuel = ' + lowestFuelCost2);
};

module.exports = readCSV;
