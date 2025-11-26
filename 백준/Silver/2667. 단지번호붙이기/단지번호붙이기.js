const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());
const map = Array.from(Array(N), (_, i) => input[i].split('').map(Number));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;
const visited = Array.from(Array(N), () => Array(N).fill(false));
const ans = [];

const bfs = (r, c) => {
  const q = [];
  let head = 0, tail = 0;
  let cnt = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }

  push(r, c);

  while (head < tail) {
    const [row, col] = q[head++];
    const dir = [[row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1]];
    cnt++;

    for (const [nr, nc] of dir) {
      if (!inRange(nr, nc) || map[nr][nc] === 0 || visited[nr][nc]) continue;
      push(nr, nc);
    }
  }
  return cnt;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 1 && !visited[i][j]) ans.push(bfs(i, j));
  }
}

ans.sort((a, b) => a - b);
console.log(ans.length);
console.log(ans.join('\n'));