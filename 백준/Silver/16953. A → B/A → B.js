let [A, B] = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

let ans = 0;
while(B >= A){
  if(B === A) {
    ans++;
    break;
  } else if(B % 2 === 0) {
    ans++;
    B /= 2;
  } else if (String(B).split('').pop() === '1') {
    B = +String(B).split('').slice(0, -1).join('');
    ans++;
  } else {
    ans = -1;
    break;
  }
}

if(B < A) console.log(-1);
else console.log(ans);