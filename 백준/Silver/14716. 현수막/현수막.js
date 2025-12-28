const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [M, N] = input.shift().split(' ').map(Number);
const banner = Array.from(Array(M), (_, i) => input[i].split(' ').map(Number));

const inRange = (r, c) => r >= 0 && r < M && c >= 0 && c < N;
const visited = Array.from(Array(M), () => Array(N).fill(false));
let cnt = 0;

const dr = [0, 1, 0, -1, 1, 1, -1, -1];
const dc = [1, 0, -1, 0, 1, -1, -1, 1];

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

    for (let i = 0; i < 8; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || banner[nr][nc] === 0) continue;
      push(nr, nc);
    }
  }
  cnt++;
}

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j] && banner[i][j] === 1) bfs(i, j);
  }
}

console.log(cnt);