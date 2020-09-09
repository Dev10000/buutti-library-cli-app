const fs = require('fs');
const books = JSON.parse( fs.readFileSync('books.json', 'utf8') );
console.log(books);
