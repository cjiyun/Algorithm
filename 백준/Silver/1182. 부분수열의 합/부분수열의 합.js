const [[N, S], nums] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.split(' ').map(Number));

let cnt = 0;

const dfs = (i, sum) => {
  if (i === N) {
    if (sum === S) cnt++;
    return;
  }
  dfs(i + 1, sum + nums[i]);
  dfs(i + 1, sum);
}

dfs(0, 0);
if (S === 0) cnt--;
console.log(cnt);