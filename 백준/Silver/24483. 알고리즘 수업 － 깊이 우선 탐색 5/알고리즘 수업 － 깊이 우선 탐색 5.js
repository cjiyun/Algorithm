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

const depth = Array(N + 1).fill(-1);
const order = Array(N + 1).fill(0);
let t = 1;

const dfs = (v) => {
  for (const nv of adj[v]) {
    if (depth[nv] !== -1) continue;
    depth[nv] = depth[v] + 1;
    order[nv] = ++t
    dfs(nv);
  }
}

depth[R] = 0;
order[R] = t;
dfs(R);

let sum = 0;
for (let i = 1; i <= N; i++) {
  sum += depth[i] * order[i];
}

console.log(sum);