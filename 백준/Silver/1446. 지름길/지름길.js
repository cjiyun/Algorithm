const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const D = input[idx++];
const shortcuts = Array.from(Array(D + 1), () => []);

for (let i = 0; i < N; i++) {
  const [start, end, cost] = [input[idx++], input[idx++], input[idx++]];
  if (start > D || end > D) continue;
  if (cost > end - start) continue;
  shortcuts[start].push([end, cost]);
}

const dp = Array(D + 1).fill(Infinity);
dp[0] = 0;

for (let i = 0; i <= D; i++) {
  dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);

  for (const [end, cost] of shortcuts[i]) {
    dp[end] = Math.min(dp[end], dp[i] + cost);
  }
}

console.log(dp[D]);