const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const M = input[idx++];
const ps = Array.from(Array(N + 1), () => Array(N + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    const v = input[idx++]
    ps[i][j] = ps[i - 1][j] + ps[i][j - 1] - ps[i - 1][j - 1] + v;
  }
}

for (let i = 0; i < M; i++) {
  const x1 = input[idx++], y1 = input[idx++];
  const x2 = input[idx++], y2 = input[idx++];

  const sum = ps[x2][y2] - ps[x1 - 1][y2] - ps[x2][y1 - 1] + ps[x1 - 1][y1 - 1];
  console.log(sum);
}

