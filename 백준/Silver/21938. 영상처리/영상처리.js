const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const T = Number(input.pop());

const display = Array.from(Array(N), () => Array(M).fill(0));

for (let i = 0; i < N; i++) {
  const row = input[i].split(' ').map(Number);

  for (let j = 0; j < M * 3; j += 3) {
    let rgbSum = 0;

    for (let k = 0; k < 3; k++) {
      rgbSum += row[j + k];
    }

    display[i][j / 3] = rgbSum / 3;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    display[i][j] = display[i][j] >= T ? 255 : 0;
  }
}

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < M;
const visited = Array.from(Array(N), () => Array(M).fill(false));
let cnt = 0;

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

const bfs = (sr, sc) => {
  const q = [];
  let head = 0, tail = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }
  push(sr, sc);

  while (head < tail) {
    const [r, c] = q[head++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || display[nr][nc] === 0) continue;
      push(nr, nc);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] || display[i][j] === 0) continue;
    bfs(i, j);
    cnt++;
  }
}

console.log(cnt);