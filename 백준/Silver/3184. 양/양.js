const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [R, C] = input.shift().split(' ').map(Number);
const map = Array.from(Array(R), (_, i) => input[i].split(''));

const inRange = (r, c) => r >= 0 && r < R && c >= 0 && c < C;
const visited = Array.from(Array(R), () => Array(C).fill(false));

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
const bfs = (sr, sc) => {
  let o = 0, v = 0;
  if (map[sr][sc] === 'o') o++;
  else v++;
  
  const q = [];
  let head = 0, tail = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }
  push(sr, sc, o, v);

  while (head < tail) {
    const [r, c] = q[head++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i], nc = c + dc[i];
      if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === '#') continue;
      push(nr, nc);
      if (map[nr][nc] === 'o') o++;
      else if (map[nr][nc] === 'v') v++;
    }
  }
  return [o, v];
}

let sheep = 0, wolves = 0;
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (visited[i][j] || map[i][j] === '#' || map[i][j] === '.') continue;
    const [o, v] = bfs(i, j);
    if (o > v) sheep += o;
    else wolves += v;
  }
}

console.log(sheep, wolves);