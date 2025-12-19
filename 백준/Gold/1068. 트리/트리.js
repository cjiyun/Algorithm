const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input.shift());
const parents = input.shift().split(' ').map(Number);
const X = Number(input)

const graph = Array.from(Array(N), () => []);
let root = -1;
for (let i = 0; i < N; i++) {
  const p = parents[i];
  if (p === -1) root = i;
  else graph[p].push(i);
}

if (X === root) {
  console.log(0);
  process.exit(0);
}

let cnt = 0;

const push = v => {
  q[tail++] = v;
  visited[v] = true;
}

const dfs = (v) => {
  let haveChild = false;

  for (const nv of graph[v]) {
    if (nv === X) continue;
    haveChild = true;
    dfs(nv);
  }

  if (!haveChild) cnt++;
}

dfs(root)
console.log(cnt);