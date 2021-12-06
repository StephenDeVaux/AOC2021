const { Console } = require("console");
const fs = require("fs");
const inputCsv = "./data/day5data.csv";
// const inputCsv = "./data/day5dataTest.csv";

const readCSV = async () => {
  console.log("Day 5");
  const input = fs.readFileSync(inputCsv, "utf8").split("\n");

  let map = createMap(input);

  // input.forEach((line) => {
  //   map = addCoOrdsToMap(map, getCordsFromLine(line));
  // });
  let newMap = [...map]
  for (let j = 0; j < input.length ; j++) { 
    newMap = addCoOrdsToMap(newMap, getCordsFromLine(input[j]));
  }

  console.log(findAllRiskyZones(newMap));
};

const createMap = (inputCsv) => {
  let maxX = 0;
  let maxY = 0;

  inputCsv.forEach((line) => {
    let [co1, co2] = getCordsFromLine(line);
    if (co1.y > maxY) maxY = co1.y;
    if (co2.y > maxY) maxY = co2.y;
    if (co1.x > maxX) maxX = co1.x;
    if (co2.x > maxX) maxX = co2.x;
  });

  return [...Array(maxY + 1)].map((e) => Array(maxX + 1).fill(0));
};

const getCordsFromLine = (line) => {
  let [co1, co2] = line.split("->");
  return [
    { x: parseInt(co1.split(",")[0]), y: parseInt(co1.split(",")[1]) },
    { x: parseInt(co2.split(",")[0]), y: parseInt(co2.split(",")[1]) },
  ];
};

const addCoOrdsToMap = (map, line) => {
  let newMap = [...map];
  let [co1, co2] = line;

  if (co1.y === co2.y && co1.x === co2.x) {
    console.log('a point!' + line)
    
  }
  if (co1.y === co2.y) {
    //horizontal line
    const xs = [co1.x, co2.x].sort();
    for (let x = xs[0]; x <= xs[1]; x++) {
      newMap[co1.y][x] += 1;
    }
  } else if (co1.x === co2.x) {
    //vertical line
    const ys = [co1.y, co2.y].sort();
    for (let y = ys[0]; y <= ys[1]; y++) {
      newMap[y][co1.x] += 1;
    }
  } else {
    // console.log('uh oh....' + line)
  }
  return newMap;
};

const findAllRiskyZones = (map) => {
  let riskyZones = 0;
  map.forEach((row) => {
    row.forEach((co) => {
      if (co > 1) riskyZones++;
    });
  });

  return riskyZones;
};

module.exports = readCSV;
