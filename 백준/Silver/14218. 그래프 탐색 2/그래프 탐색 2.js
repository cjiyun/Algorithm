const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

let p = 0;
const [n, m] = input[p++];

const routes = Array.from(Array(n + 1), () => []);
for (let k = 0; k < m; k++) {
  const [c1, c2] = input[p++];
  routes[c1].push(c2);
  routes[c2].push(c1);
}

const q = Number(input[p++]);

for (let k = 0; k < q; k++) {
  const [i, j] = input[p++];
  routes[i].push(j);
  routes[j].push(i);

  const dist = Array(n + 1).fill(-1);
  const queue = [];
  let head = 0, tail = 0;

  const push = (v, d) => {
    queue[tail++] = v;
    dist[v] = d;
  }
  push(1, 0);

  while(head < tail) {
    const v = queue[head++];
    const d = dist[v];

    for (const nv of routes[v]) {
      if (dist[nv] !== -1) continue;
      push(nv, d + 1);
    }
  }
  console.log(dist.slice(1).join(' '));
}