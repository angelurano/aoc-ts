// Path: src/2025/day04
import { openInput } from '../openInput.ts';

const file = openInput(2025, 4);

const data = file.trim().split('\n');
const res = countAccessibleRolls(data);
console.log(res);

function countAccessibleRolls(data: string[]): number {
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] === '@') {
        let cur = 0;

        for (let y = -1; y <= 1 && cur < 5; y++) {
          for (let x = -1; x <= 1 && cur < 5; x++) {
            if (x === 0 && y === 0) continue;
            if (i + y < 0 || i + y > data.length - 1
              || j + x < 0 || j + x > data[i].length - 1
              || data[i + y][j + x] === '.') {
              cur++;
            }
          }
        }

        if (cur >= 5) count++;
      }
    }
  }
  return count;
}
