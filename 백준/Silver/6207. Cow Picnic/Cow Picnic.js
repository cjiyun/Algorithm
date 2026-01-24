const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const [K, N, M] = input.shift();

const pastures = Array.from(Array(N + 1), () => []);
const cows = Array(K + 1).fill(0);
for (let i = 1; i <= K; i++) {
  const [n] = input.shift();
  pastures[n].push(i);
  cows[i] = n;
}

const routes = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  const [A, B] = input[i]
  routes[A].push(B);
}

for (let i = 1; i <= K; i++) {
  const visited = Array(N + 1).fill(false);

  const dfs = v => {
    visited[v] = true;

    for (const nv of routes[v]) {
      if (visited[nv]) continue;
      pastures[nv].push(i);
      dfs(nv);
    }
  }

  dfs(cows[i]);
}

let cnt = 0;
for (let i = 1; i <= N; i++) {
  if (pastures[i].length === K) cnt++;
}

console.log(cnt)