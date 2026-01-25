const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const [N, M] = input.shift();

const timeB = Array.from(Array(N + 1), () => []);
const timeE = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  const [A, B, C, D] = input[i];
  timeB[A].push([B, C]);
  timeE[A].push([B, D]);
}

const MAXT = 1000 * (N - 1);

const dpB = Array.from(Array(N + 1), () => Array(MAXT + 1).fill(false));
const dpE = Array.from(Array(N + 1), () => Array(MAXT + 1).fill(false));
dpB[1][0] = true;
dpE[1][0] = true;

for (let u = 1; u <= N; u++) {
  for (let t = 0; t < MAXT; t++) {
    if (dpB[u][t]) {
      for (const [v, costB] of timeB[u]) {
        const nt = t + costB;
        if (nt <= MAXT) dpB[v][nt] = true;
      }
    }

    if (dpE[u][t]) {
      for (const [v, costE] of timeE[u]) {
        const nt = t + costE;
        if (nt <= MAXT) dpE[v][nt] = true;
      }
    }
  }
}

let min = Infinity;
for (let t = 0; t <= MAXT; t++) {
  if (dpB[N][t] && dpE[N][t]) {
    min = t;
    break;
  }
}

console.log(min === Infinity ? 'IMPOSSIBLE' : min);