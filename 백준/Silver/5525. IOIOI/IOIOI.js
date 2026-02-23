const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let line = 0;
const N = Number(input[line++]);
const M = Number(input[line++]);
const S = input[line++].split('');

const len = 2 * N + 1
const q = [];
let cnt = 0;

for (const ch of S) {
  q.push(ch);
  if (ch === 'I' && q.length >= len) {
    let isP = true;
    for (let i = 0; i < len; i++) {
      if (i % 2 === 0 && q[q.length - len + i] === 'I') continue;
      if (i % 2 !== 0 && q[q.length - len + i] === 'O') continue;
      isP = false;
      break;
    }
    if (isP) cnt++;
  }
}

console.log(cnt);