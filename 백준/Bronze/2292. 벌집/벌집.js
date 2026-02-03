const N = Number(require('fs')
  .readFileSync(0, 'utf-8')
  .trim());

let layer = 1;
let max = 1;

while (max < N) {
  max += 6 * layer;
  layer++;
}

console.log(layer);