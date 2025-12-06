// Path: src/2025/day06
import { openInput } from '../openInput.ts';

const file = openInput(2025, 6);

const operations = parseData(file);
const res = performOperations(operations);
console.log(res);

function parseData(file: string): Operation[] {
  const lines = file.trimEnd().split('\n');
  const lastLine = lines.pop();
  if (lastLine == null) return [];

  const operators = lastLine.trim().split(/ +/);

  const operations: Operation[] = operators.map((operator) => ({
    operator,
    values: [],
  }));
  const largestRowLength = Math.max(...lines.map((row) => row.length));

  let curOperator = operators.length - 1;
  for (let col = largestRowLength - 1; col >= 0; col--) {
    const verticalVal = lines
      .map(line => line[col] ?? ' ')
      .join('')
      .trim();

    if (verticalVal !== '') {
      operations[curOperator].values.push(Number(verticalVal));
    } else {
      curOperator--;
    }
  }
  return operations;
}

function performOperations(operations: Operation[]): number {
  let result = 0;
  for (const operation of operations) {
    let curResult = operation.operator === '*' ? 1 : 0;
    for (const val of operation.values) {
      if (operation.operator === '+') {
        curResult += val;
      } else if (operation.operator === '*') {
        curResult *= val;
      }
    }
    result += curResult;
  }
  return result;
}

interface Operation {
  operator: string;
  values: number[];
}
