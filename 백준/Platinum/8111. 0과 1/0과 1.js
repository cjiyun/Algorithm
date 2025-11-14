const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n').map(Number);
const T = input.shift();


function solution(n) {
  if (n === 1) return '1';

  const visited = Array(n).fill(false);
  const parent = Array(n).fill(-1);
  const digit = Array(n).fill(-1);

  const start = 1 % n;
  const q = new Array(n);
  let head = 0, tail = 0;

  q[tail++] = start;
  visited[start] = true;
  parent[start] = -1;
  digit[start] = 1;

  if (start === 0) return '1';

  let goal = -1;

  while (head < tail) {
    const r = q[head++];

    for (const d of [0, 1]) {
      const nr = (r * 10 + d) % n;
      if (!visited[nr]) {
        visited[nr] = true;
        parent[nr] = r;
        digit[nr] = d;
        q[tail++] = nr;
        if (nr === 0) {goal = 0; head = tail; break;}
      }
    }
  }
  if (goal !== 0) return 'BRAK';

  let cur = 0;
  const out = [];
  while (cur !== -1) {
    out.push(String(digit[cur]));
    cur = parent[cur];
  }
  return out.reverse().join('');
}

let ans = [];
for (let i = 0; i < T; i++) {
  ans.push(solution(input[i]));
}

console.log(ans.join('\n'));