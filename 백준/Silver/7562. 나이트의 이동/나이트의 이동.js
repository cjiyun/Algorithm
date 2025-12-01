const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const T = Number(input.shift());
let p = 0;

const bfs = () => {
  const I = Number(input[p++]);
  const [sr, sc] = input[p++].split(' ').map(Number);
  const [fr, fc] = input[p++].split(' ').map(Number);

  if (sr === fr && sc === fc) return 0;

  const visited = Array.from(Array(I), () => Array(I).fill(false));
  const inRange = (r, c) => r >= 0 && r < I && c >= 0 && c < I;

  const q = [];
  let head = 0, tail = 0;
  const dr = [-2, -1, 1, 2, 2, 1, -1, -2];
  const dc = [1, 2, 2, 1, -1, -2, -2, -1];

  const push = (r, c, d) => {
    q[tail++] = [r, c, d];
    visited[r][c] = true;
  }

  push(sr, sc, 0);

  while (head < tail) {
    const [r, c, d] = q[head++];
    for (let i = 0; i < 8; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      const nd = d + 1;
      if (!inRange(nr, nc) || visited[nr][nc]) continue;
      if (nr === fr && nc === fc) return nd;
      push(nr, nc, nd);
    }
  }
}

for (let i = 0; i < T; i++) {
  console.log(bfs());
}