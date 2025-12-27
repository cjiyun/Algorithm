const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [M, N] = input.shift().split(' ').map(Number);
const fiber = Array.from(Array(M), (_, i) => input[i].split('').map(Number));

const inRange = (r, c) => r >= 0 && r < M && c >= 0 && c < N;
const visited = Array.from(Array(M), () => Array(N).fill(false));
let percolate = false;

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
const bfs = (sr, sc) => {
  const q = [];
  let head = 0, tail = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }
  push(sr, sc);

  while (head < tail) {
    const [r, c] = q[head++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || fiber[nr][nc] === 1) continue;
      if (nr === M - 1) {
        percolate = true;
        return;
      }
      push(nr, nc);
    }
  }
}

for (let c = 0; c < N; c++) {
  if (!visited[0][c] && fiber[0][c] === 0) bfs(0, c);
}

percolate ? console.log('YES') : console.log('NO');