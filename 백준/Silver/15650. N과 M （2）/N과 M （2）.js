const [N, M] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const seq = [];
let result = '';

const dfs = (start, depth) => {
  if (depth === M) {
    result += seq.join(' ') + '\n';
    return;
  }

  for (let i = start; i <= N; i++) {
    seq.push(i);
    dfs(i + 1, depth + 1);
    seq.pop();
  }
};

dfs(1, 0);
console.log(result);