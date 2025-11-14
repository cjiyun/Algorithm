const input = require('fs').readFileSync(0, 'utf-8').trim().split('-');
let ans = [];
input.forEach(item => {
    if(item.includes('+')) {
        let sum = 0;
        item = item.split('+');
        item.forEach(i => {
            sum += +i
        });
        ans.push(sum);
    } else {
        ans.push(+item);
    }
})

console.log(ans.reduce((prev, cur) => prev - cur));