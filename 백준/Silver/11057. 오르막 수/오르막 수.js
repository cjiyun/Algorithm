const N = Number(require('fs')
  .readFileSync(0, 'utf-8')
  .trim());

const MOD = 10007;
const dp = Array(10).fill(1);

for (let len = 2; len <= N; len++) {
  for (let d = 1; d <= 9; d++) {
    dp[d] = (dp[d] + dp[d - 1]) % MOD;
  }
}

console.log(dp.reduce((a, b) => a + b, 0) % MOD);