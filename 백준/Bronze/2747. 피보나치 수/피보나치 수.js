const n = Number(require('fs').readFileSync(0, 'utf-8').trim());

let a = 0;
let b = 1;

for (let i = 2; i <= n; i++) {
  [a, b] = [b, a + b];
}

console.log(b);