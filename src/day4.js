const fs = require("fs");
// const inputCsv = "./data/day4data.csv"
const inputCsv = "./data/day4dataTest.csv";

const readCSV = async () => {
  console.log("Day 4");
  const input = fs.readFileSync(inputCsv, "utf8").split("\n");

  const numbersCalled = input[0].split(",");
  const arrBoards = getAllBoards(input);
  let winningBoard = findFirstWinnerBoard(numbersCalled, arrBoards);
  let it = iterationWinner(numbersCalled, arrBoards);
  console.log("iteration - " + it);
  console.log(winningBoard);
};

let getAllBoards = (input) => {
  let arrBoards = [[]];
  let boardNum = 0;

  for (let i = 2; i < input.length; i++) {
    if (input[i] === "") {
      boardNum++;
      arrBoards.push([]);
      continue;
    }
    arrBoards[boardNum].push(input[i]);
  }

  return arrBoards;
};

let checkIfWinner = (numbersCalled, board) => {
  //check rows
  let bingo = false;
  board.forEach((row) => {
    let rowNums = row.trim().split(/\ +/);
    if (rowNums.every((num) => numbersCalled.includes(num))) {
      bingo = true;
    }
  });

  //   Check columns
  return bingo;
};

let findFirstWinnerBoard = (numbersCalled, arrBoards) => {
  let winningBoard = "";
  for (let i = 0; i < numbersCalled.length; i++) {
    for (let j = 0; j < arrBoards.length; j++) {
      isWinner = checkIfWinner(numbersCalled.slice(0, i), arrBoards[j]);
      if (isWinner) {
        console.log("a winning board?");
        winningBoard = arrBoards[j];
        break;
      }
    }
    if (winningBoard !== "") break;
  }
  return winningBoard;
};

let iterationWinner = (numbersCalled, arrBoards) => {
  let winningBoard = "";
  for (let i = 0; i < numbersCalled.length; i++) {
    for (let j = 0; j < arrBoards.length; j++) {
      isWinner = checkIfWinner(numbersCalled.slice(0, i), arrBoards[j]);
      if (isWinner) {
        console.log("a winning board?");
        winningBoard = i;
        break;
      }
    }
    if (winningBoard !== "") break;
  }
  return winningBoard;
};

module.exports = readCSV;
