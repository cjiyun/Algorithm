const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().trim().split(' ').map(Number);
const [H, W, sr, sc, fr, fc] = input.pop().split(' ').map(Number);

let board = Array.from({length: N}, (_, i) => input[i].trim().split(' ').map(Number));
let visited = Array.from(Array(N), () => new Array(M).fill(false));

let q = [];
const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const inRange = (r, c) => r >= 0 && c >= 0 && r + H <= N && c + W <= M;
const ps = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
for (let i = 0; i < N; i++) {
  let rowSum = 0;
  for (let j = 0; j < M; j++) {
    rowSum += board[i][j];
    ps[i + 1][j + 1] = ps[i][j + 1] + rowSum;
  }
}
const blocked = (r, c) => {
  const r2 = r + H, c2 = c + W;
  const sum = ps[r2][c2] - ps[r][c2] - ps[r2][c] + ps[r][c];
  return sum > 0;
};

const bfs = (startR, startC) => {
  if (sr === fr && sc === fc) return 0;
  q = [[startR, startC, 0]];
  visited[startR][startC] = true;

  while (q.length > 0) {
    let [row, col, cnt] = q.shift();

    for (const dir of direction) {
      const nextRow = row + dir[0];
      const nextCol = col + dir[1];
      let wall = false

      if (!inRange(nextRow, nextCol)) continue;
      if (visited[nextRow][nextCol]) continue;
      if (blocked(nextRow, nextCol)) continue;
      if (nextRow === fr - 1 && nextCol === fc - 1) return cnt + 1;
      visited[nextRow][nextCol] = true;
      q.push([nextRow, nextCol, cnt + 1]);
    }
  }
  return -1;
}

console.log(bfs(sr - 1, sc - 1))