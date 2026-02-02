const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const [T] = input.shift();

const dp = Array.from(Array(30), () => Array(30).fill(0));

for (let n = 0; n < 30; n++) {
  dp[n][0] = 1;
  dp[n][n] = 1;
  for (let r = 1; r < n; r++) {
    dp[n][r] = dp[n - 1][r - 1] + dp[n - 1][r];
  }
}

for (let i = 0; i < T; i++) {
  const [N, M] = input[i];
  console.log(dp[M][N]);
}
