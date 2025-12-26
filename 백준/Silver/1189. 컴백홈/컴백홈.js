const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [R, C, K] = input.shift().split(' ').map(Number);
const map = Array.from(Array(R), (_, i) => input[i].split(''));

const inRange = (r, c) => r >= 0 && r < R && c >= 0 && c < C;
const visited = Array.from(Array(R), () => Array(C).fill(false));
let cnt = 0;

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
const dfs = (r, c, depth) => {
  if (r === 0 && c === C - 1) {
    if (depth === K) cnt++;
    return;
  }

  if (depth === K) return;

  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];
    if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === 'T') continue;
    visited[nr][nc] = true;
    dfs(nr, nc, depth + 1);
    visited[nr][nc] = false;
  }
}

visited[R - 1][0] = true;
dfs(R - 1, 0, 1);
console.log(cnt);