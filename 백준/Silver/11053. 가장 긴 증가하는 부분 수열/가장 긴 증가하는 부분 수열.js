const [[N], A] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const dp = Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (A[j] < A[i]) dp[i] = Math.max(dp[i], dp[j] + 1)
  }
}

console.log(Math.max(...dp));