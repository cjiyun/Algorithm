const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const N = Number(input.shift());
const map = Array.from(Array(N), (_, i) => input[i].split(''));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;
const visited = Array.from(Array(N), () => Array(N).fill(false));
let cnt = 0;

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
      if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === '.') continue;
      push(nr, nc);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j] || map[i][j] === '.') continue;
    bfs(i, j);
    cnt++;
  }
}

console.log(cnt);