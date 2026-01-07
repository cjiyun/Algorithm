const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const X = Number(input.pop());

const adj = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  const [A, B] = input[i].split(' ').map(Number);
  adj[B].push(A);
}

const visited = Array(N + 1).fill(false);
let cnt = 0;

const stack = [X];
visited[X] = true;

while (stack.length) {
  const v = stack.pop();

  for (const nv of adj[v]) {
    if (visited[nv]) continue;
    stack.push(nv);
    visited[nv] = true;
    cnt++;
  }
}

console.log(cnt);