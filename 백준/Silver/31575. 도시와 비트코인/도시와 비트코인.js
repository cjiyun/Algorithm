const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
if (N === 1 && M === 1) {
  console.log('Yes');
  process.exit(0);
}

const map = Array.from(Array(M), (_, i) => input[i].split(' ').map(Number));

const inRange = (r, c) => r >= 0 && r < M && c >= 0 && c < N;
const visited = Array.from(Array(M), () => Array(N).fill(false));
const q = [];
let head = 0, tail = 0;

const push = (r, c) => {
  q[tail++] = [r, c];
  visited[r][c] = true;
}
push(0, 0);

const dr = [0, 1], dc = [1, 0];

while (head < tail) {
  const [r, c] = q[head++];

  for (let i = 0; i < 2; i++) {
    const nr = r + dr[i], nc = c + dc[i];

    if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === 0) continue;
    if (nr === M - 1 && nc === N - 1) {
      console.log('Yes');
      process.exit(0);
    }
    push(nr, nc);
  }
}

console.log('No');