const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, R] = input.shift().split(' ').map(Number);
const adj = Array.from(Array(N + 1), () => []);

for (let i = 0; i < M; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

for (let i = 1; i <= N; i++) {
  adj[i].sort((a, b) => a - b);
}

const visited = Array(N + 1).fill(false);
const depth = Array(N + 1).fill(-1);

const dfs = (v) => {
  visited[v] = true;

  for (const nv of adj[v]) {
    if (visited[nv]) continue;
    depth[nv] = depth[v] + 1
    dfs(nv);
  }
}

depth[R] = 0;
dfs(R);
console.log(depth.slice(1).join('\n'));