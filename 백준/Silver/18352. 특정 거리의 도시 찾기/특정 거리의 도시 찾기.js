const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, K, X] = input.shift().split(' ').map(Number);

const adj = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  adj[a].push(b);
}
const city = [];
const dist = Array(N + 1).fill(-1);
const q = [];
let head = 0, tail = 0;

const push = (v, d) => {
  q[tail++] = v;
  dist[v] = d;
}

push(X, 0);

while (head < tail) {
  const v = q[head++];
  const d = dist[v];
  
  if (d === K) continue;

  for (const nv of adj[v]) {
    const nd = d + 1;
    if (dist[nv] !== -1) continue;
    if (nd === K) city.push(nv);
    push(nv, nd);
  }
}

if (city.length === 0) console.log(-1);
else console.log(city.sort((a, b) => a - b).join('\n'));