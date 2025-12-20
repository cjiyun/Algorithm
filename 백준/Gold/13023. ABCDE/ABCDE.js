const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);

const adj = Array.from(Array(N), () => []);
for (let i = 0; i < M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const visited = Array(N).fill(false);
let found = 0;

const dfs = (v, depth) => {
  if (depth === 4) {
    found = 1;
    return 1;
  }

  visited[v] = true;

  for (const nv of adj[v]) {
    if (!visited[nv]) dfs(nv, depth + 1);
  }
  visited[v] = false;
}

for (let i = 0; i < N; i++) {
  dfs(i, 0);
  if (found) break;
}

console.log(found);