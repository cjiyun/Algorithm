const [[n], seq] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split('\n')
  .map(line => line.split(' ').map(Number));

let cur = seq[0];
let best = seq[0];

for (let i = 1; i < n; i++) {
  cur = Math.max(seq[i], cur + seq[i]);
  best = Math.max(best, cur);
}

console.log(best);