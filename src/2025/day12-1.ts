// Path: src/2025/day12
import { openInput } from '../openInput.ts';

const file = openInput(2025, 12);

const [regions, shapes] = parseInput(file);
const presents = getPresents(shapes);
const res = countRegionsCanFitPresents(regions, presents);
console.log(res);

function parseInput(input: string): [Region[], Shape[]] {
  const nRegex = /^(\d):$/;
  const regionRegex = /^(\d+)x(\d+): (.*)$/;

  const lines = input.trim().split('\n');

  const shapes: Shape[] = [];
  let i = 0;
  while (i < lines.length && nRegex.exec(lines[i]) != null) {
    const shape: Shape = [];

    i++;
    while (lines[i] !== '') {
      shape.push(lines[i].split('').map((c) => c === '#'));
      i++;
    }
    shapes.push(shape);
    i++;
  }

  const regions: Region[] = [];
  let match: RegExpExecArray | null = null;
  while (i < lines.length && (match = regionRegex.exec(lines[i])) != null) {
    const width = Number(match[1]);
    const height = Number(match[2]);
    const presentsCount = match[3].split(' ').map((n) => Number(n));

    regions.push({ width, height, presentsCount });
    i++;
  }

  return [regions, shapes];
}

function rotateShape(shape: Shape): Shape {
  const newShape: Shape = [];

  for (let col = 0; col < shape[0].length; col++) {
    const newRow: boolean[] = [];
    for (let row = shape.length - 1; row >= 0; row--) {
      newRow.push(shape[row][col]);
    }
    newShape.push(newRow);
  }
  return newShape;
}

function mirrorShape(shape: Shape): Shape {
  return shape.map((row) => [...row].reverse());
}

function getPresents(shapes: Shape[]): Present[] {
  return shapes.map((shape) => {
    const seen = new Set<string>();
    const variations: Shape[] = [];

    let currentShape = shape;
    for (let i = 0; i < 4; i++) {
      const shapeKey = currentShape.map((row) => row.join('')).join('\n');
      if (seen.has(shapeKey)) continue;
      seen.add(shapeKey);
      variations.push(currentShape);
      currentShape = rotateShape(currentShape);
    }

    currentShape = mirrorShape(shape);
    for (let i = 0; i < 4; i++) {
      const shapeKey = currentShape.map((row) => row.join('')).join('\n');
      if (seen.has(shapeKey)) continue;
      seen.add(shapeKey);
      variations.push(currentShape);
      currentShape = rotateShape(currentShape);
    }

    const area = shape.reduce(
      (acc, row) => acc + row.filter((cell) => cell).length,
      0,
    );

    return { variations, area };
  });
}

function solveRegion(
  region: Region,
  allShapes: Present[],
  presentsIds: number[],
): boolean {
  const grid: boolean[][] = Array.from({ length: region.height }, () =>
    new Array<boolean>(region.width).fill(false),
  );

  return backtracking(0);

  function backtracking(index: number): boolean {
    if (index >= presentsIds.length) return true;

    const presentId = presentsIds[index];
    const present = allShapes[presentId];

    for (const shape of present.variations) {
      const maxRow = region.height - shape.length;
      const maxCol = region.width - shape[0].length;

      for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
          if (canPlace(shape, row, col)) {
            place(shape, row, col, true);

            if (backtracking(index + 1)) return true;

            place(shape, row, col, false);
          }
        }
      }
    }
    return false;

    function canPlace(shape: Shape, r: number, c: number): boolean {
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[0].length; j++) {
          if (shape[i][j] && grid[r + i][c + j]) {
            return false;
          }
        }
      }
      return true;
    }

    function place(shape: Shape, r: number, c: number, val: boolean): void {
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[0].length; j++) {
          if (shape[i][j]) {
            grid[r + i][c + j] = val;
          }
        }
      }
    }
  }
}

function countRegionsCanFitPresents(
  regions: Region[],
  presents: Present[],
): number {
  let count = 0;

  for (const region of regions) {
    const presentsList: number[] = [];
    let requiredArea = 0;
    region.presentsCount.forEach((count, index) => {
      for (let i = 0; i < count; i++) {
        presentsList.push(index);
      }
      requiredArea += presents[index].area * count;
    });
    if (requiredArea > region.width * region.height) {
      continue;
    }
    if (solveRegion(region, presents, presentsList)) {
      count++;
    }
  }

  return count;
}

type Shape = boolean[][];

interface Present {
  variations: Shape[];
  area: number;
}

interface Region {
  width: number;
  height: number;
  presentsCount: number[];
}
