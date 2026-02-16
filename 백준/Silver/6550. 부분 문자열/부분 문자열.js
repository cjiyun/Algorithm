let tc = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(line => line.trim().split(' ').map(str => str.split('')));

let ans = [];

for (let [S, T] of tc) {
  let i = 0;
  for (let j = 0; j < T.length && i < S.length; j++) {
    if (T[j] === S[i]) i++;
  }

  ans.push(i === S.length ? 'Yes' : 'No');
}

console.log(ans.join('\n'));