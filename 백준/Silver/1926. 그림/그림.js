const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const A = Array.from(Array(n), (_, i) => input[i].split(' ').map(Number));

const inRange = (r, c) => r >= 0 && r < n && c >= 0 && c < m;
const visited = Array.from(Array(n), () => Array(m).fill(false));
const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

const bfs = (sr, sc) => {
  const q = [];
  let head = 0, tail = 0;
  let cnt = 1;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }

  push(sr, sc);

  while (head < tail) {
    const [r, c] = q[head++];
    // cnt = s + 1;
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || A[nr][nc] === 0) continue;
      push(nr, nc);
      cnt++;
    }
  }
  return cnt;
}

let max = 0, painting = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (A[i][j] === 1 && !visited[i][j]) {
      const size = bfs(i, j)
      if (size > max) max = size;
      painting++;
    }
  }
}

console.log(painting);
console.log(max);