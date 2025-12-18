let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input.shift());
const [v1, v2] = input.shift().split(' ').map(Number);
const m = Number(input.shift());

const adj = Array.from(Array(n + 1), () => []);
for (let i = 0; i < m; i++) {
  const [x, y] = input[i].split(' ').map(Number);
  adj[x].push(y);
  adj[y].push(x);
}

const visited = Array(n + 1).fill(false);
const q = [];
let head = 0, tail = 0;

const push = (v, d) => {
  q[tail++] = [v, d];
  visited[v] = true;
}
push(v1, 0);

const bfs = () => {
  while (head < tail) {
    const [v, d] = q[head++];
    const nd = d + 1;
    for (const nv of adj[v]) {
      if (nv === v2) return nd;
      if (!visited[nv]) push(nv, nd);
    }
  }
  return -1;
}

console.log(bfs());