const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const N = input.shift();
let P = input[0].split(' ').map(Number);
P.sort((a, b) => a-b);
let sum=0;
let total=0;
for(let i=0; i<N; i++) {
    sum += P[i];
    total += sum;
}
console.log(total);