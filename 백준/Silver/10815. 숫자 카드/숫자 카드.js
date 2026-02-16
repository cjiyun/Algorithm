const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(/\s+/).map(Number);

let p = 0;
const N = input[p++];
let A = input.slice(p, p + N);
A = new Set(A);

p += N;
const M = input[p++];
const X = input.slice(p, p + M);

const ans = [];
for (const x of X) {
  ans.push(A.has(x) ? 1 : 0);
}

console.log(ans.join('\n'));