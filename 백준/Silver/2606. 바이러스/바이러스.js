const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
let p = 0;
const N = Number(input[p++]), M = Number(input[p++]);

const adj = Array.from({length: N + 1}, () => []);
for (let i = 0; i < M; i++) {
  const [a, b] = input[p++].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const q = [];
let head = 0, tail = 0;
const visited = Array(N + 1).fill(false);
let cnt = 0;

const push = (v) => {
  q[tail++] = v;
  visited[v] = true;
}

push(1);

while (head < tail) {
  const v = q[head++];
  for (const node of adj[v]) {
    if (!visited[node]) {
      push(node);
      cnt++;
    }
  }
}

console.log(cnt);