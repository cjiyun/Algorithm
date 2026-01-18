const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const [R, C] = input.shift();
const map = Array.from(Array(R), (_, i) => input[i]);

const inRange = (r, c) => r >= 0 && r < R && c >= 0 && c < C;
const visited = Array.from(Array(R), () => Array(C).fill(false));
let cnt = 0;

const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];

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
      if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === 0) continue;
      push(nr, nc);
    }
  }
}

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (visited[i][j] || map[i][j] === 0) continue;
    bfs(i, j);
    cnt++;
  }
}

console.log(cnt);