const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
let p = 0;
const T = Number(input[p++]);

const solution = () => {
  const [M, N, K] = input[p++].split(' ').map(Number);

  const map = Array.from(Array(N), () => Array(M).fill(0));
  for (let i = 0; i < K; i++) {
    const [c, r] = input[p++].split(' ').map(Number);
    map[r][c] = 1;
  }
  const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < M;

  const visited = Array.from(Array(N), () => Array(M).fill(false));
  let cnt = 0;

  const bfs = (r, c) => {
    const q = [];
    let head = 0, tail = 0;

    const push = (r, c) => {
      q[tail++] = [r, c];
      visited[r][c] = true;
    }

    push(r, c);

    while (head < tail) {
      const [row, col] = q[head++];
      const dir = [[row, col + 1], [row + 1, col], [row, col - 1], [row - 1, col]];

      for (const [nr, nc] of dir) {
        if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === 0) continue;
        push(nr, nc);
      }
    }
    cnt++;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1 && !visited[i][j]) bfs(i, j);
    }
  }

  return cnt;
}

for (let i = 0; i < T; i++) {
  console.log(solution());
}