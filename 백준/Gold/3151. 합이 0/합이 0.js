const [[N], A] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n')
  .map(v => v.split(' ').map(Number));

A.sort((a, b) => a - b);
let ans = 0;

for (let i = 0; i < N - 2; i++) {
  let j = i + 1;
  let k = N - 1;

  while (j < k) {
    const sum = A[i] + A[j] + A[k];

    if (sum === 0) {
      if (A[j] === A[k]) {
        const x = k - j + 1;
        ans += (x * (x - 1)) / 2;
        break;
      }

      let jCnt = 1;
      while (j + 1 < k && A[j] === A[j + 1]) {
        j++;
        jCnt++;
      }

      let kCnt = 1;
      while (k - 1 > j && A[k] === A[k - 1]) {
        k--;
        kCnt++;
      }

      ans += jCnt * kCnt;
      j++;
      k--;
    }
    else if (sum < 0) j++;
    else k--;
  }
}

console.log(ans);