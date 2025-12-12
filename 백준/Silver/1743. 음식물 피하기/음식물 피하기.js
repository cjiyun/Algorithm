const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, K] = input.shift().split(' ').map(Number);
const map = Array.from(Array(N), () => Array(M).fill(0));

for (let i = 0; i < K; i++) {
  const [r, c] = input[i].split(' ').map(Number);
  map[r - 1][c - 1] = 1;
}

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < M;

const visited = Array.from(Array(N), () => Array(M).fill(false));

const bfs = (sr, sc) => {
  const q = [];
  let head = 0, tail = 0;
  let size = 1;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }
  push(sr, sc)

  const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

  while (head < tail) {
    const [r, c] = q[head++];
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || !map[nr][nc]) continue;
      push(nr, nc);
      size++;
    }
  }
  return size;
}

let max = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!map[i][j] || visited[i][j]) continue;
    const s = bfs(i, j);
    if (s > max) max = s;
  }
}

console.log(max);