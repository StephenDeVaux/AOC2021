const { Console } = require("console");
const fs = require("fs");
// const inputCsv = "./data/day5data.csv";
const inputCsv = "./data/day5dataTest.csv";

const readCSV = async () => {
  console.log("Day 4");
  const input = fs.readFileSync(inputCsv, "utf8").split("\n");

  console.log(input)
};


module.exports = readCSV;
