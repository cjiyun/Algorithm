const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [M, N, H] = input.shift().split(' ').map(Number);

const box = Array(H);
let p = 0;
for (let i = 0; i < H; i++) {
  box[i] = Array.from(Array(N), () => input[p++].split(' ').map(Number));
}

const q = [];
let head = 0, tail = 0;
let zero = 0;

const inRange = (h, r, c) => h >= 0 && h < H && r >= 0 && r < N && c >= 0 && c < M;
const push = (h, r, c, d) => {
  q[tail++] = [h, r, c, d];
}

for (let h = 0; h < H; h++) {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (box[h][r][c] === 1) push(h, r, c, 0);
      else if (box[h][r][c] === 0) zero++;
    }
  }
}

if (zero === 0) {
  console.log(0);
  process.exit(0);
}

const bfs = () => {
  while (head < tail) {
    const [h, r, c, d] = q[head++];
    const nd = d + 1;
    const dir = [[h + 1, r, c], [h - 1, r, c], [h, r, c - 1], [h, r, c + 1], [h, r - 1, c], [h, r + 1, c]];

    for (const [nh, nr, nc] of dir) {
      if (!inRange(nh, nr, nc) || box[nh][nr][nc] !== 0) continue;
      box[nh][nr][nc] = 1
      zero--;
      push(nh, nr, nc, nd);
      if (zero === 0) return nd;
    }
  }
  return -1;
}

console.log(bfs());