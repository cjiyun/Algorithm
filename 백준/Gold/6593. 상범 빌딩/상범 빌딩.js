const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
let p = 0;

const bfs = (L, R, C) => {
  const map = Array.from(Array(L), () => []);
  let sl = 0, sr = 0, sc = 0;
  for (let i = 0; i < L; i++) {
    map[i] = Array.from(Array(R), () => input[p++].split(''));
    for (let j = 0; j < R; j++) {
      if (map[i][j].includes('S') || map[i][j].includes('E')) {
        for (let k = 0; k < C; k++) {
          if (map[i][j][k] === 'S') {
            sl = i;
            sr = j;
            sc = k;
          }
        }
      }
    }
    p++;
  }

  const visited = Array.from(Array(L), () => Array.from(Array(R), () => Array(C).fill(false)));
  const q = [];
  let head = 0, tail = 0;

  const inRange = (l, r, c) => l >= 0 && l < L && r >= 0 && r < R && c >= 0 && c < C;
  const push = (l, r, c, t) => {
    q[tail++] = [l, r, c, t];
    visited[l][r][c] = true;
  }
  push(sl, sr, sc, 0);

  const dl = [0, 0, 0, 0, 1, -1];
  const dr = [0, 1, 0, -1, 0, 0];
  const dc = [1, 0, -1, 0, 0, 0];
  while (head < tail) {
    const [l, r, c, t] = q[head++];
    const nt = t + 1;
    for (let i = 0; i < 6; i++) {
      const nl = l + dl[i], nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nl, nr, nc) || visited[nl][nr][nc] || map[nl][nr][nc] === '#') continue;
      if (map[nl][nr][nc] === 'E') return nt;
      push(nl, nr, nc, nt);
    }
  }
  return -1;
}


while (1) {
  const [L, R, C] = input[p++].split(' ').map(Number);
  if (L === 0) break;
  const time = bfs(L, R, C);
  if (time === -1) {
    console.log('Trapped!');
  } else console.log(`Escaped in ${time} minute(s).`)
}