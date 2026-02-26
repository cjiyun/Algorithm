const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split(/\s+/).map(Number);

const createHeap = compare => {
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
        const l = i * 2 + 1;
        const r = l + 1;
        let best = i;
        if (l < a.length && !compare(a[best], a[l])) best = l;
        if (r < a.length && !compare(a[best], a[r])) best = r;
        if (best === i) break;
        [a[i], a[best]] = [a[best], a[i]];
        i = best;
      }
    }
    return top;
  }
  return {size, peek, push, pop};
}

let idx = 0;
const T = input[idx++];
const ans = [];

for (let tc = 0; tc < T; tc++) {
  const M = input[idx++];
  const left = createHeap((a, b) => a >= b);
  const right = createHeap((a, b) => a <= b);
  const medians = [];

  const rebalance = () => {
    if (left.size() > right.size() + 1) right.push(left.pop());
    else if (right.size() > left.size()) left.push(right.pop());
  }

  for (let i = 0; i < M; i++) {
    const x = input[idx++];
    if (!left.size() || x <= left.peek()) left.push(x);
    else right.push(x);
    rebalance();

    if ((i & 1) === 0) medians.push(left.peek());
  }
  
  ans.push(medians.length);
  for (let i = 0; i < medians.length; i += 10) {
    ans.push(medians.slice(i, i + 10).join(' '));
  }
}

console.log(ans.join('\n'));