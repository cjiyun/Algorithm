const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]);

const graph = Array.from(Array(n + 1), () => []);
let root = 0;
for (let i = 1; i <= n; i++) {
  const p = Number(input[i]);
  if (p === -1) root = i;
  else graph[p].push(i);
}

const depth = Array(n + 1).fill(-1);
const q = [];
let head = 0, tail = 0;

const push = (v, d) => {
  q[tail++] = v;
  depth[v] = d;
}
push(root, 0)

while (head < tail) {
  const v = q[head++];
  const d = depth[v];

  for (const nv of graph[v]) {
    if (depth[nv] !== -1) continue;
    push(nv, d + 1);
  }
}

console.log(depth.slice(1).join('\n'));