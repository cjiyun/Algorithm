const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());
const map = Array.from(Array(N), (_, i) => input[i].split(' ').map(Number));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;
const visited = Array.from(Array(N), () => Array(N).fill(false));
const q = [];
let head = 0, tail = 0;

const push = (r, c) => {
  q[tail++] = [r, c];
  visited[r][c] = true;
}
push(0, 0);

const bfs = () => {
  while (head < tail) {
    const [r, c] = q[head++];
    const jump = map[r][c];
    const moves = [[r + jump, c], [r, c + jump]];

    for (const [nr, nc] of moves) {
      if (!inRange(nr, nc) || visited[nr][nc]) continue;
      if (map[nr][nc] === -1) return "HaruHaru";
      push(nr, nc);
    }
  }
  return "Hing";
}

console.log(bfs());