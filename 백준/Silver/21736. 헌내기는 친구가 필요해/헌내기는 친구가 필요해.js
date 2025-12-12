const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const map = Array.from(Array(N), (_, i) => input[i].split(''));
const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < M;

let sr = 0, sc = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 'I') {
      sr = i;
      sc = j;
    }
  }
}

const visited = Array.from(Array(N), () => Array(M).fill(false));
const q = [];
let head = 0, tail = 0;
let cnt = 0;

const push = (r, c) => {
  q[tail++] = [r, c];
  visited[r][c] = true;
}
push(sr, sc);

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

while (head < tail) {
  const [r, c] = q[head++];
  for (let i = 0; i < 4; i++) {
    const nr = r + dr[i], nc = c + dc[i];
    if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === 'X') continue;
    if (map[nr][nc] === 'P') cnt++;
    push(nr, nc);
  }
}

if (cnt === 0) console.log('TT');
else console.log(cnt);