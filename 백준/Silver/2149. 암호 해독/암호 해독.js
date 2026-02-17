let [key, encrypted] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(/\s+/)
  .map(v => v.split(''));

const n = encrypted.length / key.length;
let arr = [];

for (let i = 0; i < encrypted.length; i += n) {
  arr.push(encrypted.slice(i, i + n));
}
arr = arr[0].map((_, col) => arr.map(row => row[col]));

const sorted = key.map((ch, idx) => [ch, idx])
  .sort((a, b) =>
    a[0] === b[0] ? a[1] - b[1] : a[0].localeCompare(b[0]));

const decrypted = Array.from(Array(n), () => []);
for (let r = 0; r < n; r++) {
  for (let i = 0; i < key.length; i++) {
    const idx = sorted[i][1];
    decrypted[r][idx] = arr[r][i];
  }
}

console.log(decrypted.flat().join(''));