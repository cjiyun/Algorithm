let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const map = Array.from(Array(M), (_, i) => input[i].split(''));
const inRange = (r, c) => r >= 0 && r < M && c >= 0 && c < N

const visited = Array.from(Array(M), () => Array(N).fill(false));
let w = 0;
let b = 0;
const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

const bfs = (team, sr, sc) => {
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
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] !== team) continue;
      push(nr, nc);
      cnt++
    }
  }
  return cnt * cnt;
}

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    if (map[i][j] === 'W') w += bfs('W', i, j);
    else if (map[i][j] === 'B') b += bfs('B', i, j);
  }
}

console.log(w, b);