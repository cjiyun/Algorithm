const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

let p = 0;
const T = Number(input[p++]);

for (let i = 0; i < T; i++) {
  const marks = input[p++].split('');
  let sum = 0;
  let score = 0;

  for (const mark of marks) {
    if (mark === 'O') {
      score++;
      sum += score;
    } else score = 0;
  }

  console.log(sum);
}