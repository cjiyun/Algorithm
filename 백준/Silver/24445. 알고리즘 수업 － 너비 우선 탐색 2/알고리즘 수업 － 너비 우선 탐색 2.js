let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, R] = input.shift().split(' ').map(Number);
const graph = Array.from(Array(N + 1), ( ) => []);
for (let i = 0; i < M; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  graph[u].push(v);
  graph[v].push(u);
}
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => b - a);
}

const visited = Array(N + 1).fill(false);
const q = [];
const order = Array(N + 1).fill(0);
let head = 0, tail = 0;
let cnt = 1;

const push = v => {
  q[tail++] = v;
  visited[v] = true;
  order[v] = cnt++;
}
push(R)

while (head < tail) {
  const v = q[head++];
  for (const nv of graph[v]) {
    if (!visited[nv]) push(nv);
  }
}

console.log(order.slice(1).join('\n'));