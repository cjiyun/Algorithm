const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());
const map = Array.from(Array(N), (_, i) => input[i].split(' '));

const inRange = (r, c) => r >= 0 && r < N && c >= 0 && c < N;

const calc = (a, op, b) => {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
}

const isOp = ch => ch === '+' || ch === '-' || ch === '*';

let maxVal = -Infinity;
let minVal = Infinity;

const dr = [0, 1], dc = [1, 0];

const dfs = (r, c, cur, op) => {
  const cell = map[r][c];
  let nextVal = cur, nextOp = op;

  if (isOp(cell)) nextOp = cell;
  else {
    const num = Number(cell);
    if (op === null) nextVal = num;
    else nextVal = calc(cur, op, num);
    nextOp = null;
  }

  if (r === N - 1 && c === N - 1) {
    maxVal = Math.max(maxVal, nextVal);
    minVal = Math.min(minVal, nextVal);
    return;
  }

  for (let i = 0; i < 2; i++) {
    const nr = r + dr[i];
    const nc = c + dc[i];
    if (inRange(nr, nc)) dfs(nr, nc, nextVal, nextOp);
  }
};

dfs(0, 0, 0, null);

console.log(`${maxVal} ${minVal}`);