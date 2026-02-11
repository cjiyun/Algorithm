const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(l => l.trimEnd().split(' ').map(Number));

const tc = [];

while (input.length) {
  const line = input.shift();
  const k = line[0];
  if (k === 0) break;

  const nums = line.slice(1);
  const S = [];
  const seq = [];

  const dfs = (start, depth) => {
    if (depth === 6) {
      S.push(seq.join(' '));
      return;
    }

    for (let j = start; j < k; j++) {
      seq.push(nums[j]);
      dfs(j + 1, depth + 1);
      seq.pop();
    }
  };

  dfs(0, 0);
  tc.push(S.join('\n'));
}

console.log(tc.join('\n\n'));