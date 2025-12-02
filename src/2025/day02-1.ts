// Path: src/2025/day02
import { openInput } from '../openInput.ts';

const file = openInput(2025, 2);

const pairs = file.trim().split(',');
const res = sumInvalidIDs(pairs);
console.log(res);

function sumInvalidIDs(pairs: string[]): number
{
  let summation = 0;

  pairs.forEach((pair) => {
    const [left, right] = pair.split('-').map((num) => parseInt(num, 10));
    for (let i = left; i <= right; i++)
    {
      const str = i.toString();
      if (str.length % 2 !== 0) continue;
      const mid = str.length / 2;
      let j = 0;
      while (j < mid && str[j] === str[mid + j]) j++;
      if (j === mid) summation += i;
    }
  });
  return summation;
}
