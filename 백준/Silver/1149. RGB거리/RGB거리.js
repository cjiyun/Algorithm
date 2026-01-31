const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(Number));

const [ N ] = input.shift();
const costs = [0, ...input];

const dp = Array.from(Array(N + 1), () => Array(3).fill(0));

for (let i = 1; i <= N; i++) {
  dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
  dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
  dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
}

console.log(Math.min(dp[N][0], dp[N][1], dp[N][2]));