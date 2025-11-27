const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
let p = 0;
const [N, M] = input[p++].split(' ').map(Number);

const adj = Array.from(Array(N + 1), () => []);
for (let i = 1; i <= M; i++) {
  const [a, b] = input[p++].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const visited = Array(N + 1).fill(false);
let cnt = 0;

const bfs = (start) => {
  const q = [];
  let head = 0, tail = 0;
  const push = v => {
    q[tail++] = v;
    visited[v] = true;
  }

  push(start);

  while (head < tail) {
    const v = q[head++];

    for (const uv of adj[v]) if (!visited[uv]) push(uv);
  }
  cnt++;
}

for (let i = 1; i <= N; i++) if (!visited[i]) bfs(i);

console.log(cnt)