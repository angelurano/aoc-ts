// Path: src/2025/day04
import { openInput } from '../openInput.ts';

const file = openInput(2025, 4);

const data: string[][] = file.trim().split('\n').map((s) => s.split(''));
const res = countRemoved(data);
console.log(res);

function countRemoved(data: string[][]): number {
  const dirs: Coord[] = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];
  let removed = 0;
  let changed = false;

  do {
    changed = false;
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        if (data[y][x] === '@' && mustRemoveCur(x, y)) {
          data[y][x] = '.';
          removed++;
          changed = true;
        }
      }
    }
  } while (changed);

  return removed;

  function mustRemoveCur(x: number, y: number): boolean {
    let cur = 0;
    for (const dir of dirs) {
      const n: Coord = {
        x: x + dir.x,
        y: y + dir.y,
      };
      if (n.x < 0 || n.x >= data[0].length || n.y < 0 || n.y >= data.length
        || data[n.y][n.x] === '.') {
        cur++;
      }
      if (cur >= 5) return true;
    }
    return false;
  }
}

interface Coord {
  x: number;
  y : number;
}
