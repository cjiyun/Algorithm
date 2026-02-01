const [[N], ...triangle] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const dp = Array.from(Array(N), () => Array(N).fill(0));
dp[0][0] = triangle[0][0];

for (let i = 0; i < N - 1; i++) {
  for (let j = 0; j <= i; j++) {
    dp[i + 1][j] = Math.max(dp[i + 1][j], dp[i][j] + triangle[i + 1][j]);
    dp[i + 1][j + 1] = Math.max(dp[i + 1][j + 1], dp[i][j] + triangle[i + 1][j + 1]);
  }
}

console.log(Math.max(...dp[N - 1]));