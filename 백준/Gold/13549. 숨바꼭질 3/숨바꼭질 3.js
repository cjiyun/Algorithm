const [N, K] = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

if (N === K) {
  console.log(0);
  process.exit(0);
}

const MAX = 100000 + 1;

const visited = Array(MAX).fill(Infinity);
const q = [];
let head = 0, tail = 0;

const pushFront = (x, t) => {
  q[--head] = x;
  visited[x] = t;
}
const pushBack = (x, t) => {
  q[tail++] = x;
  visited[x] = t;
}
const inRange = x => x >= 0 && x < MAX;

pushBack(N, 0);

const bfs = () => {
  while (head < tail) {
    const x = q[head++], t = visited[x];
    if (x === K) return t;

    const nx = 2 * x;
    if (inRange(nx) && visited[nx] > t) {
      pushFront(nx, t);
    }

    for (const nx of [x + 1, x - 1]) {
      if (!inRange(nx) || visited[nx] <= t + 1) continue;
      pushBack(nx, t + 1);
    }
  }
}

console.log(bfs());