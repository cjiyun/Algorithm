const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

const T = input.shift();
const maxN = Math.max(...input);

const zero = Array(maxN).fill(0);
const one = Array(maxN).fill(0);

zero[0] = 1;
one[0] = 0;
if (maxN >= 1) {
  zero[1] = 0;
  one[1] = 1;
}

for (let i = 2; i <= maxN; i++) {
  zero[i] = zero[i - 1] + zero[i - 2];
  one[i] = one[i - 1] + one[i - 2];
}

for (let i = 0; i < T; i++) {
  const n = input[i];
  console.log(zero[n], one[n]);
}