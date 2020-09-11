const fs = require('fs');
const books = JSON.parse( fs.readFileSync('books.json', 'utf8') );

function getBookByISBN(isbn: string) {
	const book = books.find((book:any) => book.isbn === isbn);
	return book;
}

console.log(getBookByISBN('9781449325862'));
