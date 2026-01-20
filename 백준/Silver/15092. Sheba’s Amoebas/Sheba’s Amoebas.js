const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [m, n] = input.shift().split(' ').map(Number);
const image = Array.from(Array(m), (_, i) => input[i].split(''));

const inRange = (r, c) => r >= 0 && r < m && c >= 0 && c < n;
const visited = Array.from(Array(m), () => Array(n).fill(false));
let cnt = 0;

const bfs = (sr, sc) => {
  const q = [];
  let head = 0, tail = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }
  push(sr, sc);

  const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
  const dc = [0, 1, 1, 1, 0, -1, -1, -1];

  while (head < tail) {
    const [r, c] = q[head++];
    for (let i = 0; i < 8; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || image[nr][nc] !== '#') continue;
      push(nr, nc);
    }
  }
}

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j] || image[i][j] !== '#') continue;
    bfs(i, j);
    cnt++;
  }
}

console.log(cnt);