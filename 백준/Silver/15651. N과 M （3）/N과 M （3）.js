const [N, M] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const seq = [];
let result = '';

const dfs = (depth) => {
  if (depth === M) {
    result += seq.join(' ') + '\n';
    return;
  }

  for (let i = 1; i <= N; i++) {
    seq.push(i);
    dfs(depth + 1);
    seq.pop();
  }
};

dfs(0);
console.log(result);