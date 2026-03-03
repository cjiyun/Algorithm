const N = Number(require('fs').readFileSync(0, 'utf-8').trim());

let zero = 0n;
let one = 1n;

for (let i = 2; i <= N; i++) {
  let z = zero + one;
  one = zero;
  zero = z;
}

console.log((one + zero).toString());