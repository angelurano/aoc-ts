// Path: src/2024/day20
import { openInput } from '../openInput.ts';

const file = openInput(2024, 20);

const MIN_PICO_SECONDS = 100;
const MAX_CHEAT_TIME = 20;

const [map, startPosition] = parseData(file);
const uniqueTrace = getUniqueTrace(map, startPosition);
const res = countCheatTraces(map, uniqueTrace);
console.log(res);

function parseData(file: string): [string[], Position] {
  const map = file.trim().split('\n');
  const startY = map.findIndex((row) => row.includes('S'));
  const startX = map[startY].indexOf('S');
  return [map, { x: startX, y: startY }];
}

function getUniqueTrace(map: string[], start: Position): Map<string, number> {
  const directions: Position[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  const trace = new Map<string, number>();
  let y = start.y;
  let x = start.x;
  let picoSeconds = 0;
  trace.set(`${x},${y}`, picoSeconds);
  while (map[y][x] !== 'E') {
    for (const { x: dx, y: dy } of directions) {
      const nextX = x + dx;
      const nextY = y + dy;
      if (!isInLimits(map, nextX, nextY)) continue;
      if (map[nextY][nextX] === '#') continue;
      const key = `${nextX},${nextY}`;
      if (trace.has(`${nextX},${nextY}`)) continue;
      picoSeconds++;
      trace.set(key, picoSeconds);

      x = nextX;
      y = nextY;
      break;
    }
  }
  return trace;
}

function countCheatTraces(map: string[], trace: Map<string, number>): number {
  const cheatDirections: Position[] = [];
  for (let x = -MAX_CHEAT_TIME; x <= MAX_CHEAT_TIME; x++) {
    const xAbs = Math.abs(x);
    for (let y = -MAX_CHEAT_TIME + xAbs; xAbs + y <= MAX_CHEAT_TIME; y++) {
      const radius = xAbs + Math.abs(y);
      if (radius >= 2 && radius <= MAX_CHEAT_TIME) {
        cheatDirections.push({ x, y });
      }
    }
  }

  let count = 0;
  trace.forEach((picoSeconds, key) => {
    const [x, y] = key.split(',').map(Number);
    for (const { x: dx, y: dy } of cheatDirections) {
      const nextX = x + dx;
      const nextY = y + dy;
      if (!isInLimits(map, nextX, nextY)) continue;
      if (map[nextY][nextX] === '#') continue;
      const nextKey = `${nextX},${nextY}`;
      const nextPicoSeconds = trace.get(nextKey);
      if (nextPicoSeconds === undefined) continue;

      const radius = Math.abs(dx) + Math.abs(dy);
      if (picoSeconds - nextPicoSeconds >= MIN_PICO_SECONDS + radius) {
        count++;
      }
    }
  });
  return count;
}

function isInLimits(map: string[], x: number, y: number): boolean {
  return y >= 0 && y < map.length && x >= 0 && x < map[y].length;
}

interface Position {
  x: number;
  y: number;
}
