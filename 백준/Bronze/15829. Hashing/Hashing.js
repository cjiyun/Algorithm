const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const MOD = 1234567891;
const L = Number(input[0]);
const str = input[1].split('');
let sum = 0;
let r = 0;

for (let i = 0; i < L; i++) {
  const code = str[i].charCodeAt(0) - 96;
  sum = (sum + code * Math.pow(31, i)) % MOD;
}

console.log(sum);