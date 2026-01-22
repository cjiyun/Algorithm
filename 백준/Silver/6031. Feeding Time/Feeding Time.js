const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [W, H] = input.shift().split(' ').map(Number);
const map = Array.from(Array(H), (_, i) => input[i].split(''));

const inRange = (r, c) => r >= 0 && r < H && c >= 0 && c < W;
const visited = Array.from(Array(H), () => Array(W).fill(false));
let max = 0;

const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];

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
    for (let i = 0; i < 8; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === '*') continue;
      push(nr, nc);
    }
  }
  return cnt;
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (visited[i][j] || map[i][j] === '*') continue;
    const size = bfs(i, j);
    if (size > max) max = size;
  }
}

console.log(max);