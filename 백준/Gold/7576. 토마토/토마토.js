const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [M, N] = input.shift().split(' ').map(Number);
const box = Array.from(Array(N), (_, i) => input[i].split(' ').map(Number));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < M;

const q = [];
let head = 0, tail = 0;

let zero = 0;
for (let i = 0; i < N; i ++) {
  for (let j = 0; j < M; j ++) {
    if (box[i][j] === 1) q[tail++] = [i, j, 0];
    else if (box[i][j] === 0) zero++;
  }
}
if (zero === 0) {
  console.log(0);
  process.exit(0);
}

const bfs = () => {
  while (head < tail) {
      const [r, c, d] = q[head++];
      const dir = [[r, c + 1], [r + 1, c], [r, c - 1], [r - 1, c]];

      for (const [nr, nc] of dir) {
        const nd = d + 1;
        if (!inRange(nr, nc) || box[nr][nc] !== 0) continue;
        q[tail++] = [nr, nc, nd];
        box[nr][nc] = 1;
        zero--;
        if (zero === 0) return nd;
      }
  }
  return -1;
}

console.log(bfs())