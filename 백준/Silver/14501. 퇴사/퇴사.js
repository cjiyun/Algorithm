const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split('\n')
  .map(line => line.split(' ').map(Number));

const [N] = input.shift();
const consulting = [0, ...input];
const dp = Array(N + 2).fill(0);

for (let i = 1; i <= N; i++) {
  dp[i + 1] = Math.max(dp[i + 1], dp[i]);
  const next = i + consulting[i][0];
  if (next <= N + 1) {
    dp[next] = Math.max(dp[next], dp[i] + consulting[i][1]);
  }
}

console.log(dp[N + 1]);