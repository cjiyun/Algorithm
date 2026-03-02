const n = Number(require('fs').readFileSync(0, 'utf-8').trim());

let a = 0n;
let b = 1n;

for (let i = 0; i < n; i++) {
  [a, b] = [b, a + b];
}

console.log(a.toString());