// Path: src/2025/day01
import { openInput } from '../openInput.ts';

const file = openInput(2025, 1);

const INIT_VALUE = 50;
const MAX_LIMIT = 100;

const instructions = file.trim().split('\n');
const res = countZeroPass(instructions);
console.log(res);

function countZeroPass(instructions: string[]): number {
  let counter = 0;
  let posAbs = INIT_VALUE;

  instructions.forEach((instruction) => {
    const fact = instruction.startsWith('L') ? -1 : 1;
    const value = parseInt(instruction.slice(1), 10) * fact;
    const prevPos = posAbs;
    posAbs += value;
    if (fact == 1) {
      counter += Math.floor(posAbs / MAX_LIMIT) - Math.floor(prevPos / MAX_LIMIT);
    } else {
      counter += Math.ceil(prevPos / MAX_LIMIT) - Math.ceil(posAbs / MAX_LIMIT);
    }
  });
  return counter;
}
