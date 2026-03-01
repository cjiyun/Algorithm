const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split(/\s+/).map(Number);

let p = 0;
const T = input[p++];
const dp = Array.from(Array(15), () => Array(15).fill(0));
dp[0].forEach((v, idx) => dp[0][idx] = idx);

for (let tc = 0; tc < T; tc++) {
  const k = input[p++];
  const n = input[p++];
  
  if (dp[k][n]) {
    console.log(dp[k][n]);
    continue;
  }

  for (let i = 1; i <= k; i++) {
    if (dp[i][n]) continue;
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
    }
  }
  console.log(dp[k][n]);
}