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

  instructions.reduce((acc, instruction) => {
    const fact = instruction.startsWith('L') ? -1 : 1;
    const value = parseInt(instruction.slice(1), 10) * fact;
    const current = mod(acc + value, MAX_LIMIT);
    if (current === 0) counter++;
    return current;
  }, INIT_VALUE);
  return counter;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
