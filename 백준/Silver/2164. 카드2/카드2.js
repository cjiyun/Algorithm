const N = require('fs')
  .readFileSync(0, 'utf-8')
  .trim();

const q = Array.from({length: N}, (_, i) => i + 1);
let head = 0;

while (q.length - head > 1) {
  head++;
  q.push(q[head]);
  head++;
}

console.log(q[head]);