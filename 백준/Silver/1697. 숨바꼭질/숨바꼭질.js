const [N, K] = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

let q = [];
let head = 0, tail = 0;
let visited = new Array(100001).fill(false);
const push = (x, t) => {
  q[tail++] = [x, t];
  visited[x] = true;
}

const bfs = () => {
  if (N === K) return 0;
  push(N, 0);

  while (head < tail) {
    const [x, t] = q[head++];
    const dir = [x + 1, x - 1, 2 * x];
    for (const next of dir) {
      const nt = t + 1;
      if (next === K) return nt;
      if (next < 0 || next > 100000 || visited[next]) continue;
      push(next, nt);
    }
  }
  return 0;
}

console.log(bfs())