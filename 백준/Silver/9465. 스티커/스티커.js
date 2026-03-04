const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split(/\s+/).map(Number);

let idx = 0;
const T = input[idx++];

for (let tc = 0; tc < T; tc++) {
  const n = input[idx++];
  const top = Array(n + 1).fill(0);
  const bottom = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) top[i] = input[idx++];
  for (let i = 1; i <= n; i++) bottom[i] = input[idx++];

  let prevTop = 0;
  let prevBottom = 0;
  let prevNone = 0;

  for (let i = 1; i <= n; i++) {
    const curTop = Math.max(prevBottom, prevNone) + top[i];
    const curBottom = Math.max(prevTop, prevNone) + bottom[i];
    const curNone = Math.max(prevTop, prevBottom, prevNone);

    [prevTop, prevBottom, prevNone] = [curTop, curBottom, curNone];
  }

  console.log(Math.max(prevTop, prevBottom, prevNone));
}