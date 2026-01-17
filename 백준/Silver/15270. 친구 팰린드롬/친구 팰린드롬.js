const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const [N, M] = input.shift();

const visited = Array(N + 1).fill(false);
const pair = Array(M).fill([]);
for (let i = 0; i < M; i++) {
  const [u, v] = input[i];
  pair[i] = [u, v];
}

let maxPair = 0;

const dfs = (idx, cnt) => {
  if (idx === M) {
    maxPair = Math.max(maxPair, cnt);
    return;
  }
  const [u, v] = pair[idx];

  dfs(idx + 1, cnt);

  if (!visited[u] && !visited[v]) {
    visited[u] = visited[v] = true;
    dfs(idx + 1, cnt + 1);
    visited[u] = visited[v] = false;
  }
}

dfs(0, 0);

let answer = 2 * maxPair;
if (answer < N) answer++;
console.log(answer);