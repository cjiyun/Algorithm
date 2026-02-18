const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let data = '';
rl.on('line', (line) => {
  data += line + '\n';
});

rl.on('close', () => {
  let idx = 0;

  const skip = () => {
    while (idx < data.length) {
      const c = data.charCodeAt(idx);
      if (c > 32) break;
      idx++;
    }
  }

  const readInt = () => {
    skip();
    let sign = 1;
    if (data[idx] === '-') {
      sign = -1;
      idx++;
    }
    let num = 0;
    while (idx < data.length) {
      const c = data.charCodeAt(idx);
      if (c <= 32) break;
      num = num * 10 + (c - 48);
      idx++;
    }
    return num * sign;
  };

  const readOp = () => {
    skip();
    return data[idx++];
  };

  let minH = [];
  let maxH = [];
  const count = new Map();

  const minCompare = (a, b) => a <= b;
  const maxCompare = (a, b) => a >= b;

  const ins = (heap, compare, x) => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (compare(heap[p], heap[i])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  }

  const del = (heap, compare) => {
    if (!heap.length) return undefined;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let l = i * 2 + 1;
        let r = l + 1;
        let best = i;
        if (l < heap.length && !compare(heap[best], heap[l])) best = l;
        if (r < heap.length && !compare(heap[best], heap[r])) best = r;
        if (best === i) break;
        [heap[i], heap[best]] = [heap[best], heap[i]];
        i = best;
      }
    }
    return top;
  }

  const addCount = (x, delta) => {
    const v = (count.get(x) || 0) + delta;
    if (v <= 0) count.delete(x);
    else count.set(x, v);
  }

  const prune = (heap, compare) => {
    while (heap.length) {
      const x = heap[0];
      if ((count.get(x) || 0) > 0) break;
      del(heap, compare);
    }
  }

  const T = readInt();
  let ans = [];

  for (let t = 0; t < T; t++) {
    const k = readInt();
    minH.length = 0;
    maxH.length = 0;
    count.clear();

    for (let i = 0; i < k; i++) {
      const op = readOp();
      const n = readInt();

      if (op === 'I') {
        ins(minH, minCompare, n);
        ins(maxH, maxCompare, n);
        addCount(n, 1);
      } else {
        if (!count.size) continue;
        if (n === 1) {
          prune(maxH, maxCompare);
          const v = del(maxH, maxCompare);
          if (v !== undefined) addCount(v, -1);
        } else {
          prune(minH, minCompare);
          const v = del(minH, minCompare);
          if (v !== undefined) addCount(v, -1);
        }
      }
    }

    if (count.size) {
      prune(minH, minCompare);
      prune(maxH, maxCompare);
      ans.push(`${maxH[0]} ${minH[0]}`);
    } else ans.push('EMPTY');
  }

  console.log(ans.join('\n'));
});