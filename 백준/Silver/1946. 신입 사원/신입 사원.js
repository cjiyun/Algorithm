const [T, ...cases] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let grade = [];
while(cases.length > 0) {
    let N = +cases.shift();
    grade.push(cases.splice(0, N)
              .map(i => i.split(' ').map(Number))
              .sort((a, b) => a[0] - b[0]));
}

grade.forEach(item => {
    let pass = 1;
    let prev = item[0][1];
    for(let i = 0; i < item.length; i++) {
        if(item[i][1] < prev) {
            pass++;
            prev = item[i][1];
        }
    }
    console.log(pass);
})