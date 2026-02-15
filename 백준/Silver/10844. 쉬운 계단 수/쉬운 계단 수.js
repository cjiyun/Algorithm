const N = Number(require('fs')
  .readFileSync(0, 'utf-8')
  .trim());

const MOD = 1000000000;
let prev = Array(10).fill(0);
for (let i = 1; i <= 9; i++) {
  prev[i] = 1;
}

for (let len = 2; len <= N; len++) {
  const cur = Array(10).fill(0);
    cur[0] = prev[1] % MOD;
    cur[9] = prev[8] % MOD;
    for (let j = 1; j <= 8; j++)
      cur[j] = (prev[j - 1] + prev[j + 1]) % MOD;
    prev = cur;
}

console.log(prev.reduce((a, b) => a + b, 0) % MOD);