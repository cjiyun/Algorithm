let N = Number(require('fs').readFileSync(0, 'utf-8').trim())
let bag = 0;
while(true){
    if(N % 5 === 0){
        console.log(N/5 + bag);
        break;
    }
    if(N < 0){
        console.log(-1);
        break;
    }
    N-=3;
    bag++;
}