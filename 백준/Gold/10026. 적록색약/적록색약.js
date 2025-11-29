const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());
const painting = Array.from(Array(N), (_, i) => input[i].split(''));
const blindnessPainting = painting.map(v => [...v]);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (blindnessPainting[i][j] === 'G') blindnessPainting[i][j] = 'R';
  }
}

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;
const visited = Array.from(Array(N), () => Array(N).fill(false));
const visitedB = Array.from(Array(N), () => Array(N).fill(false));
let area = 0, blindnessArea = 0;

const bfs = (sr, sc, p, v) => {
  const q = [];
  let head = 0, tail = 0;

  const push = (r, c, color) => {
    q[tail++] = [r, c, color];
    v[r][c] = true;
  }

  push(sr, sc, p[sr][sc]);


  while (head < tail) {
    const [row, col, color] = q[head++];
    const dir = [[row, col + 1], [row + 1, col], [row, col - 1], [row - 1, col]];
    for (const [nr, nc] of dir) {
      if (!inRange(nr, nc) || v[nr][nc] || p[nr][nc] !== color) continue;
      push(nr, nc, color);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      bfs(i, j, painting, visited);
      area++;
    }
    if (!visitedB[i][j]) {
      bfs(i, j, blindnessPainting, visitedB);
      blindnessArea++;
    }
  }
}

console.log(area, blindnessArea);