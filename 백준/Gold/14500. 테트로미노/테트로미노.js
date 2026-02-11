const [[N, M], ...paper] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < M;
const visited = Array.from(Array(N), () => Array(M).fill(false));
const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

const maxVal = Math.max(...paper.flat());
let maxSum = 0;

const dfs = (r, c, sum, cnt) => {
  if (sum + (4 - cnt) * maxVal <= maxSum) return;

  if (cnt === 4) {
    maxSum = Math.max(maxSum, sum);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];
    if (!inRange(nr, nc) || visited[nr][nc]) continue;

    if (cnt === 2) {
      visited[nr][nc] = true;
      dfs(r, c, sum + paper[nr][nc], cnt + 1);
      visited[nr][nc] = false;
    }

    visited[nr][nc] = true;
    dfs(nr, nc, sum + paper[nr][nc], cnt + 1);
    visited[nr][nc] = false;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    visited[i][j] = true;
    dfs(i, j, paper[i][j], 1);
    visited[i][j] = false;
  }
}

console.log(maxSum);