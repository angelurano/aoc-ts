// Path: src/2025/day10
import { openInput } from '../openInput.ts';

const file = openInput(2025, 10);

const machineStates = getMachineStates(file);
const res = getAllMinimumPresses(machineStates);
console.log(res);

function getMachineStates(input: string): Machine[] {
  const lightsRegex = /\[([.#]+)\]/;
  const buttonsRegex = /\(([\d,]+)\)/g;

  const machines: Machine[] = [];
  const lines = input.trim().split('\n');

  for (const line of lines) {
    const lightsMatch = lightsRegex.exec(line);
    const buttonsMatch = [...line.matchAll(buttonsRegex)];

    if (lightsMatch != null && buttonsMatch.length > 0) {
      let lights = 0;
      for (const char of lightsMatch[1]) {
        lights <<= 1;
        lights |= char === '#' ? 1 : 0;
      }
      const allButtons = buttonsMatch.map((match) =>
        match[1].split(',').map((num) => Number(num)),
      );

      machines.push({
        searched: lights,
        length: lightsMatch[1].length,
        buttons: allButtons,
      });
    }
  }

  return machines;
}

function getAllMinimumPresses(machines: Machine[]): number {
  let res = 0;

  machines.forEach(({ searched, length, buttons }) => {
    const queue: State[] = [
      {
        lights: 0,
        presses: 0,
      },
    ];
    const visited = new Set<BitMask>();
    visited.add(0);

    while (queue.length > 0) {
      const element = queue.shift();
      if (element == null) break;

      if (element.lights === searched) {
        res += element.presses;
        break;
      }

      for (const button of buttons) {
        let newLights = element.lights;
        for (const pos of button) {
          const bitPos = length - 1 - pos;
          newLights ^= 1 << bitPos;
        }

        if (!visited.has(newLights)) {
          visited.add(newLights);
          queue.push({
            lights: newLights,
            presses: element.presses + 1,
          });
        }
      }
    }
  });
  return res;
}

type BitMask = number;

interface State {
  lights: BitMask;
  presses: number;
}

interface Machine {
  searched: BitMask;
  length: number;
  buttons: number[][];
}
