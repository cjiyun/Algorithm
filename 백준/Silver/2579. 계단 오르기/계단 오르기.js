const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

const N = input.shift();
const stairs = [0, ...input];

const dp = Array(N + 1).fill(0);
dp[1] = stairs[1];
if (N >= 2) dp[2] = stairs[1] + stairs[2];

for (let i = 3; i <= N; i++) {
  dp[i] = Math.max(dp[i - 3] + stairs[i - 1] + stairs[i], dp[i - 2] + stairs[i]);
}

console.log(dp[N]);