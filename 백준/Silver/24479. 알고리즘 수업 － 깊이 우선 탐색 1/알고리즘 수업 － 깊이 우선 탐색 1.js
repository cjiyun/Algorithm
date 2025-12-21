const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, R] = input.shift().split(' ').map(Number);

const graph = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  graph[u].push(v);
  graph[v].push(u);
}
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
}

const visited = Array(N + 1).fill(0);
let order = 1;

const dfs = (v) => {
  visited[v] = order++;
  for (const nv of graph[v]) {
    if (visited[nv] === 0) {
      dfs(nv);
    }
  }
}

dfs(R)
console.log(visited.slice(1).join('\n'));