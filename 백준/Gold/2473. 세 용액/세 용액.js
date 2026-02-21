const [[N], A] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(v => v.split(' ').map(Number));

A.sort((a,b) => a - b);
let ans = [];
let bestAbs = Infinity;

for (let i = 0; i < N - 2; i++) {
  let j = i + 1;
  let k = N - 1;

  while (j < k) {
    const sum = A[i] + A[j] + A[k];
    if (sum === 0) {
      ans = [A[i], A[j], A[k]];
      console.log(ans.join(' '));
      process.exit(0);
    }

    const sumAbs = Math.abs(sum);

    if (sumAbs < bestAbs) {
      bestAbs = sumAbs;
      ans = [A[i], A[j], A[k]];
    }
    if (sum > 0) k--;
    else j++;
  }
}

console.log(ans.join(' '));