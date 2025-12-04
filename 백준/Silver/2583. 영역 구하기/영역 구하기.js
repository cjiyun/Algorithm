const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [M, N, K] = input.shift().split(' ').map(Number);
const paper = Array.from(Array(M), () => Array(N).fill(0));

for (let i = 0; i < K; i++) {
  const [x1, y1, x2, y2] = input[i].split(' ').map(Number);
  for (let r = y1; r < y2; r++) {
    for (let c = x1; c < x2; c++) {
      paper[r][c] = 1;
    }
  }
}

const inRange = (r, c) => r >= 0 && r < M && c >= 0 && c < N;

const bfs = (sr, sc, visited) => {
  const q = [];
  let head = 0, tail = 0;
  let size = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
    size++;
  }

  push(sr, sc);

  while (head < tail) {
    const [r, c] = q[head++];
    const dir = [[r, c + 1], [r + 1, c], [r, c - 1], [r - 1, c]];

    for (const [nr, nc] of dir) {
      if (!inRange(nr, nc) || visited[nr][nc] || paper[nr][nc] === 1) continue;
      push(nr, nc);
    }
  }
  return size;
}

const area = [];
const visited = Array.from(Array(M), () => Array(N).fill(false));

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j] && paper[i][j] === 0) {
      area.push(bfs(i, j, visited));
    }
  }
}

console.log(area.length);
console.log(area.sort((a, b) => a - b).join(' '));