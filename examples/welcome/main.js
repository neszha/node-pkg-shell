require('colors');
const readline = require('readline');

/** Setup read line. */
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/** Input name. */
console.clear();
reader.question('Masukkan nama: ', (input) => {
  console.log(`Selamat datang, ${input.red}`);
  reader.question('', () => reader.close());
});

