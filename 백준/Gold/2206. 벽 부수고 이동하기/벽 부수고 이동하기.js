const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map(line => line.split('').map(Number));

if (N === 1 && M === 1) {
  console.log(1);
  process.exit(0);
}

const visited = Array.from(Array(2), () => Array.from(Array(N), () => Array(M).fill(false)));
const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < M;
const offset = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const q = [];
let head = 0, tail = 0;

const push = (r, c, broken, dist) => {
  q[tail++] = [r, c, broken, dist];
  visited[broken][r][c] = true;
}
push(0, 0, 0, 1);

const bfs = () => {
  while (head < tail) {
    const [r, c, broken, dist] = q[head++];
    if (r === N - 1 && c === M - 1) return dist;

    for (const [dr, dc] of offset) {
      const nr = r + dr;
      const nc = c + dc;

      if (!inRange(nr, nc)) continue;
      if (map[nr][nc] === 0) {
        if (visited[broken][nr][nc]) continue;
        push(nr, nc, broken, dist + 1);
        continue;
      }
      if (broken === 0 && !visited[1][nr][nc]) {
        push(nr, nc, 1, dist + 1);
      }
    }
  }
  return -1;
}

console.log(bfs())