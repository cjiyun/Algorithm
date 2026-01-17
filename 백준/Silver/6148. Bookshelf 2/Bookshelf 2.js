const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const [N, B] = input.shift();
const H = input.map(([h]) => h);

let min = Infinity;

const dfs = (idx, sum) => {
  if (sum >= B) {
    min = Math.min(min, sum - B);
    return;
  }

  if (idx === N) return;

  dfs(idx + 1, sum + H[idx]);
  dfs(idx + 1, sum)
}

dfs(0, 0);
console.log(min);