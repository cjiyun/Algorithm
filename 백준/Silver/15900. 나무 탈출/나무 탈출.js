const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());
const adj = Array.from(Array(N + 1), () => []);

for (let i = 0; i < N - 1; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const parent = Array(N + 1).fill(0);
const depth = Array(N + 1).fill(0);

const stack = [1];
parent[1] = -1;

while (stack.length) {
  const v = stack.pop();
  for (const nv of adj[v]) {
    if (nv === parent[v]) continue;
    parent[nv] = v;
    depth[nv] = depth[v] + 1;
    stack.push(nv);
  }
}

const leaf = [];
for (let v = 2; v <= N; v++) {
  if (adj[v].length === 1) leaf.push(v);
}

let sum = 0;
for (const v of leaf) sum += depth[v];

if (sum % 2 === 0) console.log('No');
else console.log('Yes');