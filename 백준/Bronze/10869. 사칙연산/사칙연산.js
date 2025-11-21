const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [];

readline.on('line', function(line){
	input = line.split(' ').map(n => parseInt(n));
}).on('close', function(){
	const A = input[0];
	const B = input[1];
	console.log(A+B);
	console.log(A-B);
	console.log(A*B);
	console.log(Math.floor(A/B));
	console.log(A%B);
});