const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let p = 0;
const T = Number(input[p++]);

const solution = () => {
  const [n, m] = input[p++].split(' ').map(Number);
  const adj = Array.from(Array(n + 1), () => []);

  for (let i = 0; i < m; i++) {
    const [x, y] = input[p++].split(' ').map(Number);
    adj[x].push(y);
    adj[y].push(x);
  }

  const color = Array(n + 1).fill(-1);
  let isBipartite = true;

  for (let i = 1; i <= n; i++) {
    if (color[i] !== -1) continue;

    const q = [];
    let head = 0, tail = 0;

    q[tail++] = i;
    color[i] = 1;

    while (head < tail) {
      const v = q[head++];
      for (const nv of adj[v]) {
        if (color[nv] === -1) {
          q[tail++] = nv;
          color[nv] = color[v] ^ 1;
        } else if (color[nv] === color[v]) {
          isBipartite = false;
          break;
        }
      }
      if (!isBipartite) break;
    }
    if (!isBipartite) break;
  }

  return isBipartite ? 'possible' : 'impossible';
}

for (let i = 0; i < T; i++) {
  console.log(solution());
}