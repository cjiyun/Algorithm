const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let line = 0;
const N = Number(input[line++]);
const M = Number(input[line++]);
const S = input[line++].split('');

let IOI = 0;
let cnt = 0;

for (let i = 1; i < M - 1; i++) {
  if (S[i - 1] === 'I' && S[i] === 'O' && S[i + 1] === 'I') {
    IOI++;
    if (IOI >= N) cnt++;
    i++;
  } else IOI = 0;
}

console.log(cnt);