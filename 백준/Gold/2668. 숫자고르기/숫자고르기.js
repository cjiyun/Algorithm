const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = Number(input[0]);

const a = new Array(N + 1);
for (let i = 1; i <= N; i++) {
  a[i] = Number(input[i]);
}

const inPath = Array(N + 1).fill(false);

for (let start = 1; start <= N; start++) {
  const visited = Array(N + 1).fill(false);
  let cur = start;

  while (!visited[cur]) {
    visited[cur] = true;
    cur = a[cur];
  }

  if (cur === start) {
    inPath[start] = true;
    cur = a[start];
    while (cur !== start) {
      inPath[cur] = true;
      cur = a[cur];
    }
  }
}

const result = [];
for (let i = 1; i <= N; i++) {
  if (inPath[i]) result.push(i);
}

console.log(result.length);
console.log(result.join('\n'));