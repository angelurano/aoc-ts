// Path: src/2025/day09
import { openInput } from '../openInput.ts';

const file = openInput(2025, 9);

const redTiles = parseRedTiles(file);
const res = getLargestRectangleArea(redTiles);
console.log(res);

function parseRedTiles(input: string): Coord[] {
  const lines = input.trim().split('\n');
  return lines.map(line => {
    const [x, y] = line.split(',').map(Number);
    return { x, y };
  });
}

function getRectangleArea(corner1: Coord, corner2: Coord): number {
  const width = Math.abs(corner1.x - corner2.x) + 1;
  const height = Math.abs(corner1.y - corner2.y) + 1;
  return width * height;
}

function getLargestRectangleArea(redTiles: Coord[]): number {
  let maxArea = 0;

  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const area = getRectangleArea(redTiles[i], redTiles[j]);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}

interface Coord {
  x: number;
  y: number;
}
