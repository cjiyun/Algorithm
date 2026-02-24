const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const [K, N] = input[0].trim().split(' ').map(Number);
const cable = new Array(K);
for (let i = 0; i < K; i++) {
  cable[i] = Number(input[i + 1]);
}

const can = l => {
  let cnt = 0;
  for (let i = 0; i < K; i++) {
    cnt += Math.floor(cable[i] / l);
    if (cnt >= N) {
      return true;
    }
  }
  return false;
}

let l = 1;
let r = Math.max(...cable);
let max = 0;

while (l <= r) {
  let mid = Math.floor((l + r) / 2);
  if (can(mid)) {
    l = mid + 1;
    max = Math.max(mid, max);
  } else r = mid - 1;
}

console.log(max);