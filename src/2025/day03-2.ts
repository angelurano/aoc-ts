// Path: src/2025/day03
import { openInput } from '../openInput.ts';

const file = openInput(2025, 3);

const NUM_DIGITS = 12;

const banks = file.trim().split('\n');
const higherJolts = findHigherJolts(banks);
const res = higherJolts.reduce((acc, jolt) => acc + jolt, 0);
console.log(res);

function findHigherJolts(banks: string[]): number[] {
  return banks.map((bank) => {
    const higherSeq = Array<string>(NUM_DIGITS);

    let offset = 0;
    for (let i = 0; i < NUM_DIGITS; i++)
    {
      const rightLimit = bank.length - NUM_DIGITS + i;

      higherSeq[i] = bank[offset];
      for (let j = offset + 1; j <= rightLimit; j++)
      {
        if (bank[j] > higherSeq[i]) {
          higherSeq[i] = bank[j];
          offset = j;
        }
      }
      offset++;
    }

    return Number(higherSeq.join(''));
  });
}
