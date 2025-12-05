// Path: src/2025/day05
import { openInput } from '../openInput.ts';

const file = openInput(2025, 5);

const [ranges, ids] = parseData(file);
const res = countInRanges(ranges, ids);
console.log(res);

function parseData(file: string): [Range[], string[]] {
  const lines = file.trim().split('\n');

  const ranges: Range[] = [];

  let parsingRanges = true;
  let i = 0;
  while (parsingRanges)
  {
    if (lines[i] !== '') {
      const [startStr, endStr] = lines[i].split('-');
      ranges.push({ start: Number(startStr), end: Number(endStr) });
      i++;
    } else {
      parsingRanges = false;
    }
  }
  const ids = lines.slice(i + 1);
  return [ranges, ids];
}

function countInRanges(ranges: Range[], ids: string[]): number {
  let count = 0;
  for (const id of ids) {
    const num = Number(id);
    for(const range of ranges) {
      if (num >= range.start && num <= range.end) {
        count++;
        break;
      }
    }
  }
  return (count);
}

interface Range {
  start: number;
  end: number;
}
