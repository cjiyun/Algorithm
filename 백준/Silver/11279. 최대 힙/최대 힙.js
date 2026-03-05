const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split(/\s+/).map(Number);

const N = input[0];

const compare = (a, b) => a >= b;
const createHeap = () => {
  const a = [];
  const size = () => a.length;
  const peek = () => a[0];

  const push = v => {
    a.push(v);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (compare(a[p], a[i])) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }

  const pop = () => {
    if (!a.length) return undefined;
    const top = a[0];
    const last = a.pop();

    if (a.length) {
      a[0] = last;
      let i = 0;

      while (true) {
        let l = i * 2 + 1;
        let r = l + 1;
        let best = i;

        if (l < a.length && !compare(a[best], a[l])) best = l;
        if (r < a.length && !compare(a[best], a[r])) best = r;
        if (best === i) break;
        [a[best], a[i]] = [a[i], a[best]];
        i = best;
      }
    }
    return top;
  }

  return {size, peek, push, pop};
}

const maxH = createHeap();
let ans = [];

for (let i = 1; i <= N; i++) {
  const x = input[i];
  if (x === 0) ans.push(maxH.pop() ?? 0);
  else maxH.push(x);
}

console.log(ans.join('\n'));