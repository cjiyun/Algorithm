const [T, ...tc] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

const maxN = Math.max(...tc.flat())
const dp = Array(maxN + 1).fill(0);

for (let i = 0; i < T; i++) {
  const N = tc[i];
  if (N <= 3) {
    console.log(1);
    continue;
  }
  dp[1] = dp[2] = dp[3] = 1;

  for (let j = 4; j <= N; j++) {
    if (dp[j] !== 0) continue;
    dp[j] = dp[j - 3] + dp[j - 2];
  }
  console.log(dp[N]);
}
