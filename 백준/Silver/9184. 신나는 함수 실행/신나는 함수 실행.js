const T = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(tc => tc.trim().split(' ').map(Number));

const SIZE = 21
const dp = Array.from(Array(SIZE), () => Array.from(Array(SIZE), () => Array(SIZE).fill(undefined)));

const w = (a, b, c) => {
  if (a <= 0 || b <= 0 || c <= 0) return 1;
  if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);
  if (dp[a][b][c] !== undefined) return dp[a][b][c];
  if (a < b && b < c) {
    dp[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
    return dp[a][b][c];
  } else {
    dp[a][b][c] = w(a - 1, b, c) + w(a - 1, b - 1, c) + w(a - 1, b, c - 1) - w(a - 1, b - 1, c - 1);
    return dp[a][b][c];
  }
}

for (const [a, b, c] of T) {
  if (a === -1 && b === -1 && c === -1) process.exit(0);
  console.log(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
}