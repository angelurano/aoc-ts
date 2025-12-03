// Path: src/2025/day02
import { openInput } from '../openInput.ts';

const file = openInput(2025, 2);

const pairs = file.trim().split(',');
const res = sumInvalidIDs(pairs);
console.log(res);

function sumInvalidIDs(pairs: string[]): number {
  let summation = 0;

  pairs.forEach((pair) => {
    const [left, right] = pair.split('-').map((num) => parseInt(num, 10));

    const start = Math.max(10, left);
    for (let i = start; i <= right; i++) {
      const str = i.toString();
      const mid = Math.floor(str.length / 2);

      for (let j = mid; j >= 1; j--) {
        if (str.length % j !== 0) continue;

        const times = str.length / j;
        const sub = str.slice(0, j);

        let k = 1;
        for (k; k < times; k++) {
          const idx = k * j;
          if (str.slice(idx, idx + j) !== sub) {
            break;
          }
        }

        if (k === times) {
          summation += i;
          break;
        }
      }
    }
  });

  return summation;
}
