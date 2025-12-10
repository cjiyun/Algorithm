const [F, S, G, U, D] = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);
if (S === G) {
  console.log(0);
  process.exit(0);
}

const visited = Array(F + 1).fill(false);
const q = [];
let head = 0, tail = 0;

const push = (f, m) => {
  q[tail++] = [f, m];
  visited[f] = true;
}
push(S, 0);

const d = [U, -D];
const bfs = () => {
  while (head < tail) {
    const [f, m] = q[head++];
    const nm = m + 1;
    for (let i = 0; i < 2; i++) {
      const nf = f + d[i];
      if (nf <= 0 || nf > F || visited[nf]) continue;
      if (nf === G) return nm;
      push(nf, nm);
    }
  }
  return 'use the stairs';
}

console.log(bfs());