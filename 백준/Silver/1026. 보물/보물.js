let [N, ...array] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
let A = array.shift().split(' ').map(Number);
const B = array.shift().split(' ').map(Number);
A.sort((a, b) => a - b);
const sortedB = B.sort((a, b) => b - a);
let S = 0;
for(let i = 0; i < +N; i++) {
    S += A[i] * B[i];
}
console.log(S);