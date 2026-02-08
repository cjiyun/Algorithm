const [_, ...nums] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(Number);

const stack = [];
let sum = 0;

for (const num of nums) {
  if (num === 0) sum -= stack.pop();
  else {
    stack.push(num);
    sum += num;
  }
}

console.log(sum);