const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, V] = input.shift().split(' ').map(Number);

const adj = Array.from({length: N + 1}, () => []);
for (let i = 0; i < M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}
for (let i = 1; i <= N; i++) adj[i].sort((x, y) => x - y);

const visitedD = Array(N + 1).fill(false);
let visitedB = Array(N + 1).fill(false);

const ansD = [];
const dfs = (v) => {
  ansD.push(v);
  visitedD[v] = true;

  for (const nv of adj[v]) {
    if (!visitedD[nv]) dfs(nv);
  }
}

const bfs = (start) => {
  const ansB = [];
  const q = [];
  let head = 0, tail = 0;

  q[tail++] = start;
  visitedB[start] = true;

  while (head < tail) {
    const v = q[head++];
    ansB.push(v);

    for (const nv of adj[v]) {
      if (!visitedB[nv]) {
        q[tail++] = nv;
        visitedB[nv] = true;
      }
    }
  }
  return ansB;
}

dfs(V);

console.log(ansD.join(' '));
console.log(bfs(V).join(' '));