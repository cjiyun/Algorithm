const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input.shift());
const A = input.shift().split(' ').map(Number);
const s = Number(input.shift()) - 1;

const inRange = i => i >= 0 && i < n;
const visited = Array(n).fill(false);
const stack = [];
let top = 0;
let cnt = 0;

visited[s] = true;
stack[top++] = s;
cnt++;

while (top > 0) {
  const i = stack[--top];
  const jump = A[i];
  const moves = [i + jump, i - jump];

  for (const next of moves) {
    if (!inRange(next) || visited[next]) continue;
    visited[next] = true;
    stack[top++] = next;
    cnt++;
  }
}

console.log(cnt);