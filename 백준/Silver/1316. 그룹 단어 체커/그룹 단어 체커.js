const input = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split('\n');

const words = input.slice(1);

let cnt = 0;

for (const word of words) {
  const visited = Array(26).fill(false);
  let isGroupWord = true;
  let prev = '';

  for (let i = 0; i < word.length; i++) {
    const cur = word[i]
    const idx = cur.charCodeAt(0) - 97;
    
    if (cur !== prev) {
      if (visited[idx]) {
        isGroupWord = false;
        break;
      }
      visited[idx] = true;
    }
    prev = cur;
  }
  
  if (isGroupWord) cnt++;
}

console.log(cnt);