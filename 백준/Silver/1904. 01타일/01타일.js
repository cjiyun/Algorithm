const N = Number(require('fs')
  .readFileSync(0, 'utf-8')
  .trim());

if (N === 1) {
  console.log(1);
  process.exit(0);
}

let a = 1;
let b = 2;

for (let i = 3; i <= N; i++) {
  const c = (a + b) % 15746;
  a = b;
  b = c;
}

console.log(b);