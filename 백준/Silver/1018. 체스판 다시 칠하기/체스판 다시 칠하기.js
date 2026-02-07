const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [N, M] = input.shift().split(' ').map(Number);
const board = Array.from(Array(N), (_, i) => input[i].split(''));

let min = Infinity;

const repaint = (sr, sc) => {
  let repaintW = 0;
  let repaintB = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const cur = board[sr + i][sc + j];

      if ((i + j) % 2 === 0) {
        if (cur !== 'W') repaintW++;
        if (cur !== 'B') repaintB++;
      } else {
        if (cur !== 'B') repaintW++;
        if (cur !== 'W') repaintB++;
      }
    }
  }

  return Math.min(repaintW, repaintB);
}

for (let i = 0; i <= N - 8; i++) {
  for (let j = 0; j <= M - 8; j++) {
    min = Math.min(min, repaint(i, j));
  }
}

console.log(min);