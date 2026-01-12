const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const [N, M, P] = input.shift().split(' ').map(Number);

const nextChannel = Array(M + 1).fill(0);
for (let i = 0; i < N; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  if (nextChannel[b] === 0) nextChannel[b] = a;
}

const visited = Array(M + 1).fill(false);
let cur = P;
let cnt = 0;

visited[P] = true;

while (nextChannel[cur] !== 0) {
  const next = nextChannel[cur];

  if (visited[next]) {
    cnt = -1;
    break;
  }

  visited[next] = true;
  cur = next;
  cnt++;
}

console.log(cnt);