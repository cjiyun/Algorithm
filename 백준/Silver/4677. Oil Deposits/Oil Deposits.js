const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
let p = 0;

const dr = [0, 1, 1, 1, 0, -1, -1, -1];
const dc = [1, 1, 0, -1, -1, -1, 0, 1];

while (true) {
  const [n, m] = input[p++].split(' ').map(Number);
  if (m === 0) break;

  const grid = Array.from(Array(n), () => []);
  for (let i = 0; i < n; i++) {
    grid[i] = input[p++].split('');
  }

  const inRange = (r, c) => r >= 0 && r < n && c >= 0 && c < m;
  const visited = Array.from(Array(n), () => Array(m).fill(false));
  let area = 0;

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
        if (!inRange(nr, nc) || visited[nr][nc] || grid[nr][nc] === '*') continue;
        push(nr, nc);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j] || grid[i][j] === '*') continue;
      bfs(i, j);
      area++;
    }
  }

  console.log(area);
}