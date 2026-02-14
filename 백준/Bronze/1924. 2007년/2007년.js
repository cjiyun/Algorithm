const [x, y] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(' ')
  .map(Number);

const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dow = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

let days = monthDays.slice(1, x).reduce((a, b) => a + b, 0) + y - 1;

console.log(dow[days % 7]);