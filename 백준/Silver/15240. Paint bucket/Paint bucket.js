const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [R, C] = input.shift().split(' ').map(Number);
const [Y, X, K] = input.pop().split(' ').map(Number);
const painting = Array.from(Array(R), (_, i) => input[i].split('').map(Number));
const applied = painting[Y][X];

const inRange = (r, c) => r >= 0 && r < R && c >= 0 && c < C;
const visited = Array.from(Array(R), () => Array(C).fill(false));
const q = [];
let head = 0, tail = 0;

const push = (r, c) => {
  q[tail++] = [r, c];
  visited[r][c] = true;
  painting[r][c] = K;
}
push(Y, X);

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

while (head < tail) {
  const [r, c] = q[head++];
  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];
    if (!inRange(nr, nc) || visited[nr][nc] || painting[nr][nc] !== applied) continue;
    push(nr, nc);
  }
}

for (let i = 0; i < R; i++) {
  console.log(painting[i].join(''));
}