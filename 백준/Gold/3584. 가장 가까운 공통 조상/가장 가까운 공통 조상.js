const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);

let idx = 0;
const T = input[idx++];

for (let tc = 0; tc < T; tc++) {
  const N = input[idx++];
  const parent = Array(N + 1).fill(0);
  for (let i = 1; i < N; i++) {
    const [A, B] = [input[idx++], input[idx++]];
    parent[B] = A;
  }

  let [a, b] = [input[idx++], input[idx++]];
  const visited = Array(N + 1).fill(false);

  while (a !== 0) {
    visited[a] = true;
    a = parent[a];
  }

  while (b !== 0) {
    if (visited[b]) {
      console.log(b);
      break;
    }
    b = parent[b];
  }
}