const n = Number(require('fs').readFileSync(0, 'utf-8').trim());

const MOD = 10007;
const dp = Array.from(Array(2), () => Array(n + 1).fill(0));
dp[1] = 1;
if (n > 1) dp[2] = 3;

for (let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2] * 2) % MOD;
}

console.log(dp[n]);