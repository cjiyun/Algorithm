let [encrypted, _N, ...words] = require('fs')
  .readFileSync(0, 'utf-8')
  .trim()
  .split(/\s+/);

for (let i = 0; i < 26; i++) {
  let decrypted = '';

  for (let j = 0; j < encrypted.length; j++) {
    let ascii = (encrypted.charCodeAt(j) - 97 - i + 26) % 26;
    decrypted += String.fromCharCode(ascii + 97);
  }

  for (const word of words) {
    if (decrypted.includes(word)) {
      console.log(decrypted);
      process.exit(0);
    }
  }
}