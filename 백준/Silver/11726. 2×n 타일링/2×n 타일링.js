const n = Number(require('fs')
  .readFileSync(0, 'utf-8')
  .trim());

const dp = Array(n + 1).fill(0);
dp[1] = 1;
if (n >= 2) dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[n]);