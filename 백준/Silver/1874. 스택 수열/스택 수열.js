const [n, ...nums] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

const stack = [];
const ans = [];
let last = 0;

for (const num of nums) {
  for (let i = last + 1; i <= num; i++) {
    stack.push(i);
    ans.push('+');
  }

  const v = stack.pop();
  if (v !== num) {
    console.log('NO');
    process.exit(0);
  }

  ans.push('-');
  last = Math.max(last, v);
}

console.log(ans.join('\n'));