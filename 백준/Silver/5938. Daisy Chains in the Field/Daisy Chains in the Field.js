const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);

const adj = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  const [c1, c2] = input[i].split(' ').map(Number);
  adj[c1].push(c2);
  adj[c2].push(c1);
}

const visited = Array(N + 1).fill(false);
const q = [];
let head = 0, tail = 0;

const push = v => {
  q[tail++] = v;
  visited[v] = true;
}
push(1);

while (head < tail) {
  const v = q[head++];
  for (const nv of adj[v]) {
    if (!visited[nv]) push(nv);
  }
}

const notChained = [];
for (let i = 1; i <= N; i++) {
  if (!visited[i]) notChained.push(i);
}

console.log(notChained.length ? notChained.join('\n') : 0);