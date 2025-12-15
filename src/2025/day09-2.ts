// Path: src/2025/day09-2.ts
import { openInput } from '../openInput.ts';

const file = openInput(2025, 9);

const redTiles = parseRedTiles(file);
const walls = getWalls(redTiles);
const res = getMaxArea(redTiles, walls);

console.log(res);

function parseRedTiles(input: string): Coord[] {
  const lines = input.trim().split('\n');
  return lines.map((line) => {
    const [x, y] = line.split(',').map(Number);
    return { x, y };
  });
}

function getWalls(redTiles: Coord[]): Segment[] {
  const walls: Segment[] = [];

  for (let i = 0; i < redTiles.length; i++) {
    const p1 = redTiles[i];
    const p2 = redTiles[(i + 1) % redTiles.length];
    const wall = {
      start: p1,
      end: p2,
      isVertical: p1.x === p2.x,
    };
    walls.push(wall);
  }
  return walls;
}

function getRectangleArea(rectangle: Rectangle): number {
  const width = rectangle.maxX - rectangle.minX + 1;
  const height = rectangle.maxY - rectangle.minY + 1;
  return width * height;
}

function wallIntersectsRectangle(wall: Segment, rectangle: Rectangle): boolean {
  if (wall.isVertical) {
    const x = wall.start.x;
    if (x <= rectangle.minX || x >= rectangle.maxX) {
      return false;
    }
    const wallMinY = Math.min(wall.start.y, wall.end.y);
    const wallMaxY = Math.max(wall.start.y, wall.end.y);
    return !(wallMaxY <= rectangle.minY || wallMinY >= rectangle.maxY);
  } else {
    const y = wall.start.y;
    if (y <= rectangle.minY || y >= rectangle.maxY) {
      return false;
    }
    const wallMinX = Math.min(wall.start.x, wall.end.x);
    const wallMaxX = Math.max(wall.start.x, wall.end.x);
    return !(wallMaxX <= rectangle.minX || wallMinX >= rectangle.maxX);
  }
}

function isRectangleInside(rectangle: Rectangle, walls: Segment[]): boolean {
  for (const wall of walls) {
    if (wallIntersectsRectangle(wall, rectangle)) {
      return false;
    }
  }
  const center = {
    x: Math.floor((rectangle.minX + rectangle.maxX) / 2),
    y: Math.floor((rectangle.minY + rectangle.maxY) / 2),
  };

  let inside = false;
  for (const wall of walls) {
    if (wall.isVertical && wall.start.x > center.x) {
      const minY = Math.min(wall.start.y, wall.end.y);
      const maxY = Math.max(wall.start.y, wall.end.y);
      if (center.y >= minY && center.y <= maxY) {
        inside = !inside;
      }
    }
  }
  return inside;
}

function getMaxArea(redTiles: Coord[], walls: Segment[]): number {
  let maxArea = 0;

  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const rectangle = {
        minX: Math.min(redTiles[i].x, redTiles[j].x),
        minY: Math.min(redTiles[i].y, redTiles[j].y),
        maxX: Math.max(redTiles[i].x, redTiles[j].x),
        maxY: Math.max(redTiles[i].y, redTiles[j].y),
      };

      const area = getRectangleArea(rectangle);
      if (area > maxArea) {
        if (isRectangleInside(rectangle, walls)) {
          maxArea = area;
        }
      }
    }
  }

  return maxArea;
}

interface Coord {
  x: number;
  y: number;
}

interface Segment {
  start: Coord;
  end: Coord;
  isVertical: boolean;
}

interface Rectangle {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}
