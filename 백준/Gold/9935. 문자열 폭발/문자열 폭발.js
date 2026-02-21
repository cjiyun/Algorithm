const [str, explode] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim().split('\n');

const result = [];
const len = explode.length;
const last = explode[len - 1];

for (const ch of str) {
  result.push(ch);

  if (ch === last && result.length >= len) {
    let isExplode = true;
    for (let i = 0; i < len; i++) {
      if (result[result.length - len + i] === explode[i]) continue;
      isExplode = false;
      break;
    }
    if (isExplode) for (let i = 0; i < len; i++) result.pop();
  }
}

console.log(result.length ? result.join('') : 'FRULA');