// Path: src/2025/day11
import { openInput } from '../openInput.ts';

const file = openInput(2025, 11);

const nodes = parseInput(file);
const res = countAllPaths(nodes);
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

function countAllPaths(nodes: Map<string, string[]>): number {
  let pathCount = 0;

  dfs('you', new Set<string>());

  return pathCount;

  function dfs(currentNode: string, visited: Set<string>): void {
    if (currentNode === 'out') {
      pathCount++;
      return;
    }
    visited.add(currentNode);

    const neighbors = nodes.get(currentNode) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, visited);
      }
    }

    visited.delete(currentNode);
  }
}
