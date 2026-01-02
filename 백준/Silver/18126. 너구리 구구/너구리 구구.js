const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());
const adj = Array.from(Array(N + 1), () => []);

for (let i = 0; i < N - 1; i++) {
  const [A, B, C] = input[i].split(' ').map(Number);
  adj[A].push([B, C]);
  adj[B].push([A, C]);
}

const visited = Array(N + 1).fill(false);
const stack = [[1, 0]];
let maxDist = 0;

visited[1] = true;

while (stack.length) {
  const [cur, d] = stack.pop();
  if (d > maxDist) maxDist = d;

  for (const [n, nd] of adj[cur]) {
    if (visited[n]) continue;
    visited[n] = true;
    stack.push([n, d + nd]);
  }
}

console.log(maxDist);