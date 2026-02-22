const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
const [N, L, R] = input[idx++].split(' ').map(Number);
const A = Array.from({ length: N }, () => input[idx++].split(' ').map(Number));
const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;

const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];
let days = 0;

while (true) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let moved = false;

  for (let sr = 0; sr < N; sr++) {
    for (let sc = 0; sc < N; sc++) {
      if (visited[sr][sc]) continue;
      const union = [];
      const q = [];
      let head = 0;
      let sum = 0;

      q.push([sr, sc]);
      visited[sr][sc] = true;

      while (head < q.length) {
        const [r, c] = q[head++];
        union.push([r, c]);
        sum += A[r][c];

        for (let k = 0; k < 4; k++) {
          const nr = r + dr[k];
          const nc = c + dc[k];

          if (!inRange(nr, nc) || visited[nr][nc]) continue;

          const diff = Math.abs(A[r][c] - A[nr][nc]);
          if (diff < L || diff > R) continue;

          visited[nr][nc] = true;
          q.push([nr, nc]);
        }
      }
      
      if (union.length >= 2) {
        moved = true;
        const avg = Math.floor(sum / union.length);
        for (const [r, c] of union) A[r][c] = avg;
      }
    }
  }

  if (!moved) break;
  days++;
}

console.log(days);