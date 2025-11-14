const [L, R] = require('fs').readFileSync(0, 'utf-8').trim().split(' ');
let min = 0;
let common = []
let l = L.split(''), r = R.split('');
if(L.length !== R.length) console.log(min);
else {
    for(let i = 0; i < L.length; i++) {
        if(l[i] === r[i]) common.push(l[i]);
        else break;
    }
    common.forEach(num => {
        if(num === '8') min++;
    })
    console.log(min);
}