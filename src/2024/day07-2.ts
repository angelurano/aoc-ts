// Path: src/2024/day07
import { openInput } from '../openInput.ts';

const file = openInput(2024, 7);

const num = getCalibrationTotal(file);
console.log(num);

function getCalibrationTotal(file: string): number {
  const lines = file.split('\n').slice(0, -1);
  return lines.reduce((acc, line) => {
    const [number, values] = line.split(': ');
    const valuesSplit = values.split(' ').map(Number);
    if (checkIsValid(number, valuesSplit)) {
      return acc + Number(number);
    }
    return acc;
  }, 0);
}

function checkIsValid(searched: string, values: number[]): boolean {
  const search = (searched: number, subarr: number[]): boolean => {
    if (subarr.length === 1) return subarr[0] === searched;
    if (subarr[0] > searched) return false;

    const [first, second, ...rest] = subarr;

    const sum = first + second;
    const mul = first * second;
    const concat = Number(`${first}${second}`);

    if (search(searched, [sum, ...rest])) return true;
    if (search(searched, [mul, ...rest])) return true;
    if (search(searched, [concat, ...rest])) return true;
    return false;
  }
  return search(Number(searched), values);
}