// Path: src/2025/day06
import { openInput } from '../openInput.ts';

const file = openInput(2025, 6);

const input = parseData(file);
const res = solveVerticalProblems(input);
console.log(res);

function parseData(file: string): string[][] {
  return file
    .trim()
    .split('\n')
    .map((line) => line.trim().split(/ +/));
}

function solveVerticalProblems(input: string[][]): number {
  const operators = input[input.length - 1];
  let result = 0;
  operators.forEach((operator, index) => {
    let curResult = 0;
    for (let i = 0; i < input.length - 1; i++) {
      const value = Number(input[i][index]);

      if (operator === '+') {
        curResult += value;
      } else if (operator === '*') {
        if (curResult === 0) curResult = 1;
        curResult *= value;
      }
    }
    result += curResult;
  });
  return result;
}
