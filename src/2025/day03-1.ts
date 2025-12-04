// Path: src/2025/day03
import { openInput } from '../openInput.ts';

const file = openInput(2025, 3);

const banks = file.trim().split('\n');
const higherJolts = findHigherJolts(banks);
const res = higherJolts.reduce((acc, jolt) => acc + jolt, 0);
console.log(res);

function findHigherJolts(banks: string[]): number[] {
  return banks.map((bank) => {
    let leftIdx = 0;
    let rightIdx = 1;
    for (let i = leftIdx + 1; i < bank.length; i++) {
      if (i < bank.length - 1 && bank[i] > bank[leftIdx]) {
        leftIdx = i;
        rightIdx = i + 1;
      } else if (bank[i] > bank[rightIdx]) {
        rightIdx = i;
      }
    }

    return Number(bank[leftIdx] + bank[rightIdx]);
  });
}
