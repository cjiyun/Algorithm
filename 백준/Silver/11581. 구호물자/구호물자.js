const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];

const adj = Array.from(Array(N + 1), () => []);
for (let i = 1; i < N; i++) {
  const M = input[p++];
  for (let j = 0; j < M; j++) {
    const to = input[p++];
    adj[i].push(to);
  }
}

const visited = Array(N + 1).fill(0); // 0: 방문 안 함, 1: 방문 중, 2: 방문 완료
let isCycle = false;

const dfs = v => {
  if (isCycle) return;

  visited[v] = 1;

  for (const nv of adj[v]) {
    if (visited[nv] === 1) {
      isCycle = true;
      return;
    } else if (visited[nv] === 0) {
      dfs(nv);
    }
  }
  visited[v] = 2;
}

dfs(1);
console.log(isCycle ? 'CYCLE' : 'NO CYCLE');