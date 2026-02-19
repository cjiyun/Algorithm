const [N, ...X] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

X.sort((a, b) => a.length - b.length);
const subset = [];

for (let i = 0; i < Number(N); i++) {
  const prefix = X[i];
  let isPrefixX = true;

  for (let j = i + 1; j < N; j++) {
    if (prefix === X[j].slice(0, prefix.length)) {
      isPrefixX = false;
      break;
    }
  }
  if (isPrefixX) subset.push(prefix);
}

console.log(subset.length);