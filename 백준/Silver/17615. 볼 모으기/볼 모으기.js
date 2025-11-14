const [N, balls] = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const ball = balls.split('');
if(ball.filter(i => i === 'R').length === 0 || ball.filter(i => i === 'R').length === +N) console.log(0);
else {
  const R = ball.filter(i => i === 'R');
  const B = ball.filter(i => i === 'B');
  let leftR = 0, rightR = 0, leftB = 0, rightB = 0;
  if(ball[0] === 'R') leftR += R.length - balls.split('B')[0].length;
  else leftR += R.length;
  if(ball[0] === 'B') leftB += B.length - balls.split('R')[0].length;
  else leftB += B.length;
  if(ball[N-1] === 'R') rightR += R.length - balls.split('B').slice(-1)[0].length;
  else rightR += R.length;
  if(ball[N-1] === 'B') rightB += B.length - balls.split('R').slice(-1)[0].length;
  else rightB += B.length;
  console.log(Math.min(leftR, leftB, rightR, rightB));
}