// Path: src/2025/day08
import { openInput } from '../openInput.ts';

const file = openInput(2025, 8);

const junctionBoxes = parsePositions(file);
const distancePairs = getAllDistances(junctionBoxes);
const lastDistancePair = getMergingLastPair(
  distancePairs,
  junctionBoxes.length,
);
const res = lastDistancePair.pos1.x * lastDistancePair.pos2.x;
console.log(res);

function parsePositions(file: string): Position3[] {
  return file
    .trim()
    .split('\n')
    .map((line) => {
      const [x, y, z] = line.split(',').map((coord) => Number(coord));
      return { x, y, z };
    });
}

function getEuclideanDistance(pos1: Position3, pos2: Position3): number {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const dz = pos1.z - pos2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function getAllDistances(positions: Position3[]): DistancePair[] {
  const distances: DistancePair[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const distance = getEuclideanDistance(positions[i], positions[j]);
      distances.push({
        pos1: positions[i],
        pos2: positions[j],
        distance,
      });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);
  return distances;
}

function getMergingLastPair(
  distancePairs: DistancePair[],
  totalPositions: number,
): DistancePair {
  const groups = new Set<Set<Position3>>();
  let lastPair: DistancePair = distancePairs[0];

  for (const pair of distancePairs) {
    if (
      groups.size === 1 &&
      groups.values().next().value?.size === totalPositions
    ) {
      break;
    }
    let group1: Set<Position3> | null = null;
    let group2: Set<Position3> | null = null;
    for (const group of groups) {
      if (group.has(pair.pos1)) group1 = group;
      if (group.has(pair.pos2)) group2 = group;
    }
    if (group1 === null && group2 === null) {
      const newGroup = new Set<Position3>([pair.pos1, pair.pos2]);
      groups.add(newGroup);
    } else if (group1 !== null && group2 === null) {
      group1.add(pair.pos2);
    } else if (group1 === null && group2 !== null) {
      group2.add(pair.pos1);
    } else if (group1 !== null && group2 !== null && group1 !== group2) {
      const newGroup = group1.union(group2);
      groups.delete(group1);
      groups.delete(group2);
      groups.add(newGroup);
    }
    lastPair = pair;
  }
  return lastPair;
}

interface Position3 {
  x: number;
  y: number;
  z: number;
}

interface DistancePair {
  pos1: Position3;
  pos2: Position3;
  distance: number;
}
