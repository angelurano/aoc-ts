// Path: src/2025/day07
import { openInput } from '../openInput.ts';

const file = openInput(2025, 7);

const lines = file.trim().split('\n');
const res = countSplitBeam(lines);
console.log(res);

function addToMap(map: Map<number, number>, key: number, value: number): void {
  const current = map.get(key) ?? 0;
  map.set(key, current + value);
}

function countSplitBeam(lines: string[]): number {
  let countBeams = new Map<number, number>();
  countBeams.set(lines[0].indexOf('S'), 1);

  for (let i = 1; i < lines.length; i++) {
    const nextBeams = new Map<number, number>();
    for (const [beamIndex, count] of countBeams) {
      if (lines[i][beamIndex] === '.') {
        addToMap(nextBeams, beamIndex, count);
      } else if (lines[i][beamIndex] === '^') {
        const leftBeam = beamIndex - 1;
        if (leftBeam >= 0) {
          addToMap(nextBeams, leftBeam, count);
        }
        const rightBeam = beamIndex + 1;
        if (rightBeam < lines[i].length) {
          addToMap(nextBeams, rightBeam, count);
        }
      }
    }
    countBeams = nextBeams;
  }

  let totalCount = 0;
  for (const count of countBeams.values()) {
    totalCount += count;
  }
  return totalCount;
}
