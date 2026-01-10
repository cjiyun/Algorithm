const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const SIZE = 5;
const board = Array.from(Array(SIZE), (_, i) => input[i].split(' ').map(Number));
const [sr, sc] = input.pop().split(' ').map(Number);

const inRange = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE
const visited = Array.from(Array(SIZE), () => Array(SIZE).fill(false));
let possible = 0;

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

const dfs = (r, c, d, apples) => {
  if (apples >= 2) {
    possible = 1;
    return;
  }
  if (d === 3) return;

  visited[r][c] = true;

  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];

    if (!inRange(nr, nc) || visited[nr][nc] || board[nr][nc] === -1) continue;
    const nextApples = board[nr][nc] === 1 ? apples + 1 : apples;
    dfs(nr, nc, d + 1, nextApples);
  }
  visited[r][c] = false;
}

dfs(sr, sc, 0, 0)
console.log(possible);