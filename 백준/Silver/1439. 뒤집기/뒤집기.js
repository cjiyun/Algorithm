const input = require('fs').readFileSync(0, 'utf-8').trim();
const zero = input.split('1');
const one = input.split('0');
let N0 = 0;
let N1 = 0;
zero.forEach(item => {
    if(item.trim() !== '') N0++;
})
one.forEach(item => {
    if(item.trim() !== '') N1++;
})
if(N0 >= N1) console.log(N1);
else console.log(N0);