const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const [N, M, L] = input[0].split(' ').map(Number);
const rest = N > 0 ? input[1].split(' ').map(Number) : [];

const pos = [0, ...rest.sort((a, b) => a - b), L];

const need = d => {
  let cnt = 0;
  for (let i = 0; i < pos.length - 1; i++) {
    const len = pos[i + 1] - pos[i];
    cnt += Math.floor((len - 1) / d);
    if (cnt > M) return cnt;
  }
  return cnt;
};

let lo = 1;
let hi = L;

while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (need(mid) <= M) hi = mid;
  else lo = mid + 1;
}

console.log(lo);