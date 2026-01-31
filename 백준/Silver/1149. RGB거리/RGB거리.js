const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const [N] = input.shift();
const costs = [0, ...input];

let cur = [0, 0, 0];

for (let i = 1; i <= N; i++) {
  cur = [
    costs[i][0] + Math.min(cur[1], cur[2]),
    costs[i][1] + Math.min(cur[0], cur[2]),
    costs[i][2] + Math.min(cur[0], cur[1])
  ];
}

console.log(Math.min(...cur));