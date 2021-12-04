const { Console } = require("console");
const fs = require("fs");
const inputCsv = "./data/day4data.csv";
// const inputCsv = "./data/day4dataTest.csv";

const readCSV = async () => {
  console.log("Day 4");
  const input = fs.readFileSync(inputCsv, "utf8").split("\n");

  const numbersCalled = input[0].split(",");
  const arrBoards = getAllBoards(input);
  let winningBoard = findFirstWinnerBoard(numbersCalled, arrBoards);
  let it = iterationWinner(numbersCalled, arrBoards);
  console.log("iteration - " + it);
  console.log(winningBoard);

  //Part1
  unmarkedSum = sumOfUnmarkedNums(winningBoard, numbersCalled.slice(0, it));
//   console.log("UNMARKED SUM = " + unmarkedSum);
//   console.log(" Winning num = " + numbersCalled[it - 1]);
//   console.log(" Total = " + numbersCalled[it - 1] * unmarkedSum);

  whenAllBoardsWin = arrBoards.map((board) => {
    return checkWhenBoardWins(board, numbersCalled);
  });

  //Part2
  console.log("when a board wins");
  console.log(whenAllBoardsWin);
  idx = whenAllBoardsWin.indexOf(Math.max.apply(null, whenAllBoardsWin));
  console.log(idx)
  numberscalled2 = numbersCalled.slice(0, whenAllBoardsWin[idx])
  console.log('numberscalled2 = ' + numberscalled2)
  unmarkedSumlastboard = sumOfUnmarkedNums(arrBoards[idx], numbersCalled.slice(0, whenAllBoardsWin[idx]));
  console.log("UNMARKED SUM = " + unmarkedSumlastboard);
  console.log(" Winning num = " + numbersCalled[whenAllBoardsWin[idx] - 1]);
  console.log(" Total = " + numbersCalled[whenAllBoardsWin[idx] - 1] * unmarkedSumlastboard);

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
  for (let col = 0; col < board[0].length; col++) {
    let colNums = [];
    board.forEach((row) => {
      let rowNums = row.trim().split(/\ +/);
      colNums.push(rowNums[col]);
    });
    if (colNums.every((num) => numbersCalled.includes(num))) {
      bingo = true;
    }
  }
  return bingo;
};

let findFirstWinnerBoard = (numbersCalled, arrBoards) => {
  let winningBoard = "";
  for (let i = 0; i < numbersCalled.length; i++) {
    for (let j = 0; j < arrBoards.length; j++) {
      let isWinner = checkIfWinner(numbersCalled.slice(0, i), arrBoards[j]);
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
      let isWinner = checkIfWinner(numbersCalled.slice(0, i), arrBoards[j]);
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

let sumOfUnmarkedNums = (board, numbersCalled) => {
  let sum = 0;
  board.forEach((row) => {
    let rowNums = row.trim().split(/\ +/);
    sum += rowNums.reduce((total, num) => {
      if (!numbersCalled.includes(num)) {
        return total + parseInt(num);
      } else {
        return total;
      }
    }, 0);
  });
  return sum;
};

let checkWhenBoardWins = (board, numbersCalled) => {
  let whenBoardWinsArry = -1;
  for (let i = 0; i < numbersCalled.length; i++) {
    let isWinner = checkIfWinner(numbersCalled.slice(0, i), board);
    if (isWinner) {
      whenBoardWinsArry = i;
      break;
    }
  }
  return whenBoardWinsArry;
};

module.exports = readCSV;
