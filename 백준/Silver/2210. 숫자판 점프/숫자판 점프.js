const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = 5;
const board = Array.from(Array(N), (_, i) => input[i].split(' '));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;

const numbers = new Set();

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
const dfs = (r, c, depth, path) => {
  if (depth === 5) {
    numbers.add(path);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];
    if (!inRange(nr, nc)) continue;
    dfs(nr, nc, depth + 1, path + board[nr][nc]);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    dfs(i, j, 0, board[i][j]);
  }
}

console.log(numbers.size);