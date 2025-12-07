// Path: src/2025/day07
import { openInput } from '../openInput.ts';

const file = openInput(2025, 7);

const lines = file.trim().split('\n');
const res = countSplitBeam(lines);
console.log(res);

function countSplitBeam(lines: string[]): number {
  let count = 0;
  const beamsIndexes: number[] = [];
  beamsIndexes.push(lines[0].indexOf('S'));
  for (let i = 1; i < lines.length; i++) {
    const newBeamsIndexes = new Set<number>();
    let beamIndex: number | undefined = undefined;
    while ((beamIndex = beamsIndexes.shift()) !== undefined) {
      if (lines[i][beamIndex] === '.') {
        newBeamsIndexes.add(beamIndex);
      } else if (lines[i][beamIndex] === '^') {
        count++;

        const leftBeam = beamIndex - 1;
        if (leftBeam >= 0) newBeamsIndexes.add(leftBeam);
        const rightBeam = beamIndex + 1;
        if (rightBeam < lines[i].length) newBeamsIndexes.add(rightBeam);
      }
    }
    beamsIndexes.push(...newBeamsIndexes);
  }
  return count;
}
