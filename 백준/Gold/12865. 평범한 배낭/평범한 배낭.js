const [[N, K], ...stuff] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split('\n')
  .map(line => line.split(' ').map(Number));

const dp = Array(K + 1).fill(0);

stuff.forEach(([w, v]) => {
  for (let i = K; i >= w; i--) {
    dp[i] = Math.max(dp[i], dp[i - w] + v);
  }
})

console.log(dp[K]);