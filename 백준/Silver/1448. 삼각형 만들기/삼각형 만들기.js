const [N, ...len] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

len.sort((a, b) => b - a);

for (let i = 0; i <= N - 3; i++) {
  const a = len[i];
  const b = len[i + 1];
  const c = len[i + 2];
  if (a >= b + c) continue;
  console.log(a + b + c);
  process.exit(0);
}

console.log(-1);