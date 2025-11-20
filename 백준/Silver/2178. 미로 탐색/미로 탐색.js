const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
let map = Array.from({length: N}, (_, i) => input[i].split('').map(Number));

let q = [];
let visited = Array.from(Array(N), () => Array(M).fill(false));
const push = (r, c, d) => {
  q.push([r, c, d]);
  visited[r][c] = true;
}

push(0, 0, 1);

out: while (q.length > 0) {
  const [row, col, dist] = q.shift();
  const dir = [[row, col + 1], [row + 1, col], [row, col - 1], [row - 1, col]];
  for (const [nr, nc] of dir) {
    let nd = dist + 1;
    if (nr === N - 1 && nc === M - 1) {
      console.log(nd);
      break out;
    }
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
    if (map[nr][nc] === 0 || visited[nr][nc]) continue;
    push(nr, nc, nd);
  }
}