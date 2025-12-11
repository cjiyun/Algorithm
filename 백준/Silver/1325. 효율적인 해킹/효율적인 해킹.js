const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const computer = Array.from(Array(N + 1), () => [])
for (let i = 0; i < M; i++) {
  const [A, B] = input[i].split(' ').map(Number);
  computer[B].push(A);
}

const visited = new Int32Array(N + 1);
let visitMark = 0;
const stack = new Array(N + 1);
let top = 0;

const push = v => {
  stack[top++] = v;
  visited[v] = visitMark;
}

const bfs = (start) => {
  let cnt = 0;
  visitMark++;
  top = 0;

  push(start)

  while (top > 0) {
    const v = stack[--top];
    const arr = computer[v];

    for (let i = 0; i < arr.length; i++) {
      const nv = arr[i];
      if (visited[nv] === visitMark) continue;
      push(nv);
      cnt++;
    }
  }
  return cnt;
}

let max = 0;
const ans = [];

for (let i = 1; i <= N; i++) {
  const count = bfs(i)

  if (count > max) {
    max = count;
    ans.length = 0;
    ans.push(i);
  } else if (count === max) ans.push(i);
}

console.log(ans.join(' '));