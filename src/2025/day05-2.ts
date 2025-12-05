// Path: src/2025/day05
import { openInput } from '../openInput.ts';

const file = openInput(2025, 5);

const ranges = parseData(file);
const mergedRanges = mergeOverlapRanges(ranges);
const res = countIngredients(mergedRanges);
console.log(res);

function parseData(file: string): Range[] {
  const lines = file.trim().split('\n');

  const ranges: Range[] = [];

  for (const line of lines) {
    if (line === '') break;
    const [startStr, endStr] = line.split('-');
    ranges.push({ start: Number(startStr), end: Number(endStr) });
  }
  return ranges;
}

function mergeOverlapRanges(ranges: Range[]): Range[] {
  ranges.sort((a, b) => a.start - b.start);
  const mergedRanges: Range[] = [];

  let {start, end} = ranges[0];
  for (let i = 1; i < ranges.length; i++) {
    const nextStart = ranges[i].start;
    const nextEnd = ranges[i].end;
    if (nextStart <= end) {
      if (nextEnd > end) {
        end = nextEnd;
      }
    } else {
      mergedRanges.push({ start, end });
      start = nextStart;
      end = nextEnd;
    }
  }
  mergedRanges.push({start, end});
  return mergedRanges;
}

function countIngredients(ranges: Range[]): number {
  const count = ranges.reduce((acc, range) => acc + (range.end - range.start + 1), 0);
  return count;
}

interface Range {
  start: number;
  end: number;
}
