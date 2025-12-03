const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let p = 0;
const ans = [];

const inRange = (r, c, h, w) => r >= 0 && r < h && c >= 0 && c < w;

const bfs = (sr, sc, h, w, map, visited) => {
  const q = [];
  let head = 0, tail = 0;

  const push = (r, c) => {
    q[tail++] = [r, c];
    visited[r][c] = true;
  }

  push(sr, sc);

  while (head < tail) {
    const [r, c] = q[head++];
    const dir = [[r, c + 1], [r + 1, c + 1], [r + 1, c], [r + 1, c - 1],
      [r, c - 1], [r - 1, c - 1], [r - 1, c], [r - 1, c + 1]];

    for (const [nr, nc] of dir) {
      if (!inRange(nr, nc, h, w) || visited[nr][nc] || map[nr][nc] === 0) continue;
      push(nr, nc);
    }
  }
};

while (p < input.length) {
  const [w, h] = input[p++].split(' ').map(Number);
  if (w === 0) break;
  const map = Array.from(Array(h), () => input[p++].split(' ').map(Number));
  const visited = Array.from(Array(h), () => Array(w).fill(false));

 let island = 0;
 for (let i = 0; i < h; i++) {
   for (let j = 0; j < w; j++) {
     if (map[i][j] === 1 && !visited[i][j]) {
       bfs(i, j, h, w, map, visited);
       island++;
     }
   }
 }
 ans.push(island);
}

console.log(ans.join('\n'));