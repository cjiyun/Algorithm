const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);

const adj = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  adj[a].push(b);
  adj[b].push(a);
}

const bfs = (sv) => {
  const step = Array(N + 1).fill(-1);
  const q = [];
  let head = 0, tail = 0;

  const push = (v, s) => {
    q[tail++] = v;
    step[v] = s;
  }

  push(sv, 0);

  while (head < tail) {
    const v = q[head++], s = step[v];
    const ns = s + 1;
    for (const nv of adj[v]) {
      if (step[nv] !== -1) continue;
      push(nv, ns);
    }
  }
  return step.slice(1).reduce((a, b) => a + b, 0);
}

let min = [Infinity, 0];
let sum = 0;
for (let i = 1; i <= N; i++) {
  sum = bfs(i);
  if (sum < min[0]) {
    min[0] = sum;
    min[1] = i;
  }
}

console.log(min[1]);