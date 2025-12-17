// Path: src/2025/day11
import { openInput } from '../openInput.ts';

const file = openInput(2025, 11);

const nodes = parseInput(file);
const res = countSpecificPaths(nodes);
console.log(res);

function parseInput(input: string): Map<string, string[]> {
  const lines = input.trim().split('\n');
  const nodes = new Map<string, string[]>();

  for (const line of lines) {
    const [key, pathsKeys] = line.trim().split(': ');
    const paths = pathsKeys.split(' ');
    nodes.set(key, paths);
  }
  return nodes;
}

function countSpecificPaths(nodes: Map<string, string[]>): number {
  const visited = new Set<string>();
  const saved = new Map<string, number>();

  const pathCount = dfs('svr', false, false);
  return pathCount;

  function dfs(
    currentNode: string,
    seenDac: boolean,
    seenFft: boolean,
  ): number {
    const key = `${currentNode}-${seenDac}-${seenFft}`;
    if (saved.has(key)) {
      return saved.get(key) ?? 0;
    }
    if (visited.has(currentNode)) {
      return 0;
    }

    if (currentNode === 'out') {
      if (seenDac && seenFft) return 1;
      return 0;
    }

    visited.add(currentNode);
    let totalPaths = 0;
    const neighbors = nodes.get(currentNode) ?? [];

    const isDac = seenDac || currentNode === 'dac';
    const isFft = seenFft || currentNode === 'fft';
    for (const neighbor of neighbors) {
      totalPaths += dfs(neighbor, isDac, isFft);
    }

    visited.delete(currentNode);
    saved.set(key, totalPaths);
    return totalPaths;
  }
}
