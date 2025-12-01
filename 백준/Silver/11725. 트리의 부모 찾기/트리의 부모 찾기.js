const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());

const adj = Array.from(Array(N + 1), () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const visited = Array(N + 1).fill(false);
const q = [];
const parent = [];
let head = 0, tail = 0;

const push = (v) => {
  q[tail++] = v;
  visited[v] = true;
}

push(1);

while (head < tail) {
  const v = q[head++];
  for (const nv of adj[v]) {
    if (!visited[nv]) {
      push(nv);
      parent[nv - 2] = v;
    }
  }
}

console.log(parent.join('\n'));