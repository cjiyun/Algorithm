const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let p = 0;

while (true) {
  const [W, H] = input[p++].split(' ').map(Number);
  if (W === 0) break;
  const map = Array.from(Array(H), () => input[p++].split(''));

  const inRange = (r, c) => r >= 0 && r < H && c >= 0 && c < W;
  const visited = Array.from(Array(H), () => Array(W).fill(false));

  const bfs = (sr, sc) => {
    const q = [];
    let head = 0, tail = 0;

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
        if (!inRange(nr, nc) || visited[nr][nc] || map[nr][nc] === '.') continue;
        if (map[nr][nc] === 'T') map[nr][nc] = 'S';
        push(nr, nc);
      }
    }
  }

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (visited[i][j] || map[i][j] !== 'S') continue;
      bfs(i, j);
    }
  }

  for (let i = 0; i < H; i++) {
    console.log(map[i].join(''));
  }
}