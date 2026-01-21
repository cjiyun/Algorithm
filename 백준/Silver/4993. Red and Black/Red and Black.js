const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let p = 0;

while (true) {
  const [W, H] = input[p++].split(' ').map(Number);
  if (W === 0) break;
  const room = Array.from(Array(H), () => input[p++].split(''));

  const inRange = (r, c) => r >= 0 && r < H && c >= 0 && c < W;
  const visited = Array.from(Array(H), () => Array(W).fill(false));
  let cnt = 1;

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
        if (!inRange(nr, nc) || visited[nr][nc] || room[nr][nc] === '#') continue;
        push(nr, nc);
        cnt++;
      }
    }
  }

  for (let i = 0; i < H; i++) {
    if (!room[i].includes('@')) continue;
    for (let j = 0; j < W; j++) {
      if (room[i][j] !== '@') continue;
      bfs(i, j);
      break;
    }
    break;
  }

  console.log(cnt);
}