const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

function sol(input) {
    const N = +input.shift();
    let times = [];
    for(let idx = 0; idx < N; idx++) {
        const [start, end] = input[idx].split(' ').map(Number);
        times.push({time:start, isStart:1});
        times.push({time:end, isStart:-1});
    }
    times.sort((a, b) => {
        if(a.time === b.time) return a.isStart - b.isStart;
        return a.time - b.time;
    })
    let max = 0;
    let current = 0;
    for(const t of times) {
        if(t.isStart === 1) current++;
        else current--;
        if(max < current) max = current;
    }
    console.log(max);
}

sol(input);