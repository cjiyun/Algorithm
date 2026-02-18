let [N, ...U] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(/\s+/)
  .map(Number);

U.sort((a, b) => a - b);
const xySet = new Set();
for (let i = 0; i < N; i++) {
  for (let j = i; j < N; j++) {
    xySet.add(U[i] + U[j]);
  }
}

for (let kIdx = N - 1; kIdx >= 0; kIdx--) {
  for (let zIdx = 0; zIdx < N; zIdx++) {
    if (xySet.has(U[kIdx] - U[zIdx])) {
      console.log(U[kIdx]);
      process.exit(0);
    }
  }
}