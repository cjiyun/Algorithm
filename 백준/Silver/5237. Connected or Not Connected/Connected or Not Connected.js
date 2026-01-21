const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const solution = (line) => {
  let p = 0;
  const n = input[line][p++];
  const k = input[line][p++];

  const adj = Array.from(Array(n), () => [])
  for (let i = 0; i < k; i++) {
    const a = input[line][p++];
    const b = input[line][p++];
    adj[a].push(b);
    adj[b].push(a);
  }

  let isConnected = true;

  for (let i = 0; i < n; i++) {
    const visited = Array(n).fill(false);

    const dfs = v => {
      visited[v] = true;

      for (const nv of adj[v]) {
        if (visited[nv]) continue;
        dfs(nv);
      }
    }

    dfs(i);
    if(visited.includes(false)) {
      isConnected = false;
      break;
    }
  }
  return isConnected;
}

const [T] = input.shift();
for (let i = 0; i < T; i++) {
  console.log(solution(i) ? 'Connected.' : 'Not connected.');
}