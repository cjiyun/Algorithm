const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const T = Number(input.shift());
const str = Array.from(Array(T), (_, i) => input[i].split(''));

for (let i = 0; i < T; i++) {
  const stack = [];
  let isVPS = true;

  for (const p of str[i]) {
    if (p === '(') stack.push(p);
    else if (!stack.length) {
      isVPS = false;
      break;
    }
    else stack.pop();
  }

  console.log(isVPS && !stack.length ? 'YES' : 'NO');
}