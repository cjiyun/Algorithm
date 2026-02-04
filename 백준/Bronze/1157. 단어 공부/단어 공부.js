const char = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().toUpperCase();

const cnt = Array(26).fill(0);
let max = 0;
let ans = '?';

for (const ch of char) {
  cnt[ch.charCodeAt(0) - 65]++;
}

for (let i = 0; i < 26; i++) {
  if (cnt[i] > max) {
    max = cnt[i];
    ans = String.fromCharCode(i + 65);
  } else if (cnt[i] === max) ans = '?';
}

console.log(ans);