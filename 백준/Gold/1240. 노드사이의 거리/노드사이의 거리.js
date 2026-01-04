const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
let p = 0;
const [N, M] = input[p++].split(' ').map(Number);

const adj = Array.from(Array(N + 1), () => []);
for (let i = 0; i < N - 1; i++) {
  const [u, v, d] = input[p++].split(' ').map(Number);
  adj[u].push([v, d]);
  adj[v].push([u, d]);
}

const bfs = (from, to) => {
  const visited = Array(N + 1).fill(false);
  const q = [];
  let head = 0, tail = 0;

  const push = (v, d) => {
    q[tail++] = [v, d];
    visited[v] = true;
  }
  push(from, 0);

  while (head < tail) {
    const [v, d] = q[head++];

    for (const [nv, nd] of adj[v]) {
      if (visited[nv]) continue;
      if (nv === to) return d + nd;
      push(nv, d + nd);
    }
  }
}

for (let i = 0; i < M; i++) {
  const [from, to] = input[p++].split(' ').map(Number);
  console.log(bfs(from, to));
}