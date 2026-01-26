const N = Number(require('fs')
  .readFileSync(0, 'utf-8')
  .trim());

const dp = Array(N + 1).fill(0);

for (let x = 2; x <= N; x++) {
  dp[x] = dp[x - 1] + 1;
  if (x % 2 === 0) dp[x] = Math.min(dp[x], dp[x / 2] + 1);
  if (x % 3 === 0) dp[x] = Math.min(dp[x], dp[x / 3] + 1);
}

console.log(dp[N]);