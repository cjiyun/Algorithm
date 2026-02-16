let [_N, A, _M, X] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

A = new Set(A);

const ans = [];
for (const x of X) ans.push(A.has(x) ? 1 : 0);

console.log(ans.join('\n'));