const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, K] = input.shift().split(' ').map(Number);

const map = Array.from(Array(N), (_, i) => input[i].split(' ').map(Number));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;
const visited = Array.from(Array(N), () => Array(N).fill(false));
let needed = 0;

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

const bfs = (sr, sc) => {
  const q = [];
  let head = 0, tail = 0;
  let cnt = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
    cnt++;
  }
  push(sr, sc);

  while (head < tail) {
    const [r, c] = q[head++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === 1) continue;
      push(nr, nc);
    }
  }
  return cnt;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j] || map[i][j] === 1) continue;
    const size = bfs(i, j);
    needed += Math.ceil(size / K);
  }
}

if (needed === 0 || needed > M) console.log('IMPOSSIBLE');
else {
  console.log('POSSIBLE');
  console.log(M - needed);
}