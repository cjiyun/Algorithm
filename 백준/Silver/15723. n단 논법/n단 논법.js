const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const SIZE = 26;
let p = 0;

const n = Number(input[p++]);
const premises = Array.from(Array(SIZE), () => []);

const base = 'a'.charCodeAt(0);
const charToNum = ch => ch.charCodeAt(0) - base;

for (let i = 0; i < n; i++) {
  const [ch1, ch2] = input[p++].split(' is ');
  const idx1 = charToNum(ch1);
  const idx2 = charToNum(ch2);
  premises[idx1].push(idx2);
}

const bfs = (from, to) => {
  const visited = Array(SIZE).fill(false);
  const q = [];
  let head = 0, tail = 0;

  const push = ch => {
    q[tail++] = ch;
    visited[ch] = true;
  }
  push(from);

  while (head < tail) {
    const cur = q[head++];

    for (const next of premises[cur]) {
      if (visited[next]) continue;
      if (next === to) return 'T';
      push(next);
    }
  }
  return 'F';
}

const m = Number(input[p++]);
for (let i = 0; i < m; i++) {
  const [from, to] = input[p++].split(' is ');
  console.log(bfs(charToNum(from), charToNum(to)));
}
