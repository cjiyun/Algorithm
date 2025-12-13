const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input.shift()), m = Number(input.shift())

const adj = Array.from(Array(n + 1), () => []);
for (let i = 0; i < m; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const visited = Array(n + 1).fill(false);
const q = [];
let head = 0, tail = 0;
let deep = 0;

const push = (v, d) => {
  q[tail++] = [v, d];
  visited[v] = true;
}
push(1, 0);

while (head < tail) {
  const [v, d] = q[head++];
  if (d === 2) continue;
  const nd = d + 1;
  for (const nv of adj[v]) {
    if (!visited[nv]) push(nv, nd);
  }
}

console.log(q.length - 1);