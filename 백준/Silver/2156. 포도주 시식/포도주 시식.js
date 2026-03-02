const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);

const n = input.shift();
const wine = [0, ...input];

const dp = Array(n + 1).fill(0);
dp[1] = wine[1];
if (n > 1) dp[2] = wine[1] + wine[2];

for (let i = 3; i <= n; i++) {
  dp[i] = Math.max(dp[i - 1], dp[i - 2] + wine[i], dp[i - 3] + wine[i - 1] + wine[i]);
}

console.log(dp[n]);