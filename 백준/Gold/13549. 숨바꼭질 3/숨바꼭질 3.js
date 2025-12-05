const [N, K] = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

if (N === K) {
  console.log(0);
  process.exit(0);
}

const MAX = 100000 + 1;

const visited = Array(MAX).fill(false);
const q = [];
let head = 0, tail = 0;

const pushFront = (x, t) => {
  q[--head] = [x, t];
  visited[x] = true;
}
const pushBack = (x, t) => {
  q[tail++] = [x, t];
  visited[x] = true;
}
const inRange = x => x >= 0 && x < MAX;

pushBack(N, 0);

const bfs = () => {
  while (head < tail) {
    const [x, t] = q[head++];

    const nx = 2 * x;
    if (inRange(nx) && !visited[nx]) {
      if (nx === K) return t;
      pushFront(nx, t);
    }

    for (const nx of [x - 1, x + 1]) {
      if (!inRange(nx) || visited[nx]) continue;
      if (nx === K) return t + 1;
      pushBack(nx, t + 1);
    }
  }
}

console.log(bfs());