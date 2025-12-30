const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let p = 0;
const T = Number(input[p++]);

const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];

const bfs = () => {
  let sheep = 0;
  const [H, W] = input[p++].split(' ').map(Number);
  const grid = Array.from(Array(H), () => input[p++].split(''));

  const inRange = (r, c) => r >= 0 && r < H && c >= 0 && c < W;
  const visited = Array.from(Array(H), () => Array(W).fill(false));

  for (let sr = 0; sr < H; sr++) {
    for (let sc = 0; sc < W; sc++) {
      if (visited[sr][sc] || grid[sr][sc] === '.') continue;

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
          if (!inRange(nr, nc) || visited[nr][nc] || grid[nr][nc] === '.') continue;
          push(nr, nc);
        }
      }
      sheep++;
    }
  }
  return sheep;
}

for (let i = 0; i < T; i++) {
  console.log(bfs());
}
