const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let l = 0;
const [n, k] = input[l++].split(' ').map(Number);

const adj = Array.from(Array(n), () => []);
for (let i = 0; i < n - 1; i++) {
  const [p, c] = input[l++].split(' ').map(Number);
  adj[p].push(c);
  adj[c].push(p);
}

const apples = input[l].split(' ').map(Number);

const visited = Array(n).fill(false);
const q = [];
let head = 0, tail = 0;
let cnt = 0;

const push = (v, d) => {
  q[tail++] = [v, d];
  visited[v] = true;
  cnt += apples[v];
}
push(0, 0);

while (head < tail) {
  const [v, d] = q[head++];
  if (d === k) continue;

  for (const nv of adj[v]) {
    if (visited[nv]) continue;
    push(nv, d + 1);
  }
}

console.log(cnt);