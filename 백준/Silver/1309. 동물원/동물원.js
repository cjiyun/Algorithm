const N = Number(require('fs')
  .readFileSync(0, 'utf-8')
  .trim());

const MOD = 9901;
let zero = 1;
let left = 1;
let right = 1;

for (let i = 1; i < N; i++) {
  const n0 = (zero + left + right) % MOD;
  const nL = (zero + right) % MOD;
  const nR = (zero + left) % MOD;
  zero = n0; left = nL; right = nR;
}

console.log((zero + left + right) % MOD);