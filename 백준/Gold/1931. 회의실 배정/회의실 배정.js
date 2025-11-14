const input = require('fs').readFileSync(0, 'utf-8').split('\n');
const N = +input.shift();
const I = input.map((num) => num.split(' ').map((num) => +num));
I.sort((a, b) => {
    if(a[1] === b[1]){
        return a[0] - b[0];
    } else{
        return a[1] - b[1];
    }
});
let answer = 0;
let endTime = 0;
I.forEach((time) => {
    if(time[0] >= endTime){
        answer++;
        endTime = time[1];
    }
});
console.log(answer);