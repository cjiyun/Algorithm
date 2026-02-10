const [N, M] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const visited = Array(N + 1).fill(false);
const seq = [];
let result = '';

const dfs = (length) => {
  if (length === M) {
    result += seq.join(' ') + '\n';
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    seq.push(i);

    dfs(length + 1);

    seq.pop();
    visited[i] = false;
  }
};

dfs(0);
console.log(result);