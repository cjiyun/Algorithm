const [N, K] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const dp = Array.from(Array(K + 1), () => Array(N + 1).fill(0));

for (let n = 0; n <= N; n++) {
  dp[1][n] = 1;
}
for (let k = 1; k <= K; k++) {
  dp[k][0] = 1;
}

for (let i = 2; i <= K; i++) {
  for (let j = 1; j <= N; j++) {
    dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000000;
  }
}

console.log(dp[K][N]);