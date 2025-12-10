const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const map = Array.from(Array(n), (_, i) => input[i].split(' ').map(Number));
const inRange = (r, c) => r >= 0 && r < n && c >= 0 && c < m;

const dist = Array.from(Array(n), () => Array(m).fill(-1));
const q = [];
let head = 0, tail = 0;
let sr = 0, sc = 0;

const push = (r, c, d) => {
  q[tail++] = [r, c];
  dist[r][c] = d;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0) dist[i][j] = 0;
    else if (map[i][j] === 2) {
      sr = i;
      sc = j;
    }
  }
}

push(sr, sc, 0);

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

while (head < tail) {
  const [r, c] = q[head++];
  const d = dist[r][c];
  const nd = d + 1;

  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];
    if (!inRange(nr, nc) || dist[nr][nc] !== -1 || map[nr][nc] === 0) continue;
    push(nr, nc, nd);
  }
}

for (let i = 0; i < n; i++) {
  console.log(dist[i].join(' '))
}