const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, k] = input.shift().split(' ').map(Number);
let map = Array.from({length: 2}, (_, i) => input[i].trim().split('').map(Number));

let q = [];
let head = 0, tail = 0;
let visited = Array.from(Array(2), () => new Array(N).fill(false));
const push = (r, c, t) => {
    q[tail++] = [r, c, t];
    visited[r][c] = true;
}

const bfs = () => {
  push(0, 0, 0);

  while (head < tail) {
      let [row, col, t] = q[head++];
      if(col < t) continue;
      
      const dir = [[row, col + 1], [row, col - 1], [row ^ 1, col + k]];

      for (const [nr, nc] of dir) {
          const nt = t + 1;

          if (nc >= N) return 1;
          if (map[nr][nc] === 0 || visited[nr][nc] || nc < 0 || nc < nt) continue;
          push(nr, nc, nt);
      }
  }
  return 0;
}

console.log(bfs(0, 0, 0))