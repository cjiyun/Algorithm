const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const SIZE = 5;
const map = Array.from(Array(SIZE), (_, i) => input[i].split(' ').map(Number));
const [sr, sc] = input.pop().split(' ').map(Number);

const inRange = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
let min = Infinity;

const dfs = (r, c, moves, apples) => {
  if (apples === 3) {
    min = Math.min(moves, min);
    return;
  }
  if (moves >= min) return;


  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];
    if (!inRange(nr, nc) || map[nr][nc] === -1) continue;

    const tmp = map[r][c];
    const nextApples = apples + map[nr][nc];

    map[r][c] = -1;
    dfs(nr, nc, moves + 1, nextApples);
    map[r][c] = tmp;
  }
}

dfs(sr, sc, 0, 0)
console.log(min === Infinity ? -1 : min);