const [N, dist, price] = require('fs').readFileSync(0, 'utf-8').trim().split('\n').map(i => i.split(' ').map(Number));
let min = price[0];
let ans = BigInt(0);
for(let i = 0; i < N - 1; i++) {
    min = Math.min(min, price[i]);
    ans += BigInt(min) * BigInt(dist[i]);
}
console.log(String(ans));